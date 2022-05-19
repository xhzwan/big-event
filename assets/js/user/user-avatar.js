$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    let layer = layui.layer
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        let file = e.target.files[0]
        let imgURL = URL.createObjectURL(file)
        //  销毁旧的             新设路径            初始化裁剪区域
        $image.cropper('destroy').attr('src', imgURL).cropper(options)

    })

    $('#btnUpload').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png')

        $.ajax({
            method: 'PATCH',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }

        })
    })


})