$(function () {
    let layer = layui.layer
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success(res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    initArtCateList()
    let indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()

        })
    })



    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/cate/add',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    let indexEdit = null
    let form = layui.form
    $('tbody').on('click', '.btn-edit', function (e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        let id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/cate/info?id=' + id,
            // data: {
            //     id: id
            // },

            success(res) {
                form.val('form-edit', res.data)
            }

        })

    })


    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'PUT',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('更新分类数据失败！')
                }

                layer.msg('更新分类数据成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 删除

    $('tbody').on('click', '.btn-delete', function (e) {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'DELETE',
                url: '/my/cate/del?id=' + id,
                // data: {
                //     id: id
                // },

                success(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index);
                    initArtCateList()
                }

            })


        });


    })



})