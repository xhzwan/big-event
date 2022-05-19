$(function () {
    const form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInfo', res.data)
            }

        })
    }

    $('#btnReset').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()
        initUserInfo()
    })


    // 更新用户行为
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'put',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})



