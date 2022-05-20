$(function () {
    let data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    let layer = layui.layer
    let laypage = layui.laypage
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data,
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('获取文章列表失败')
                }

                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 渲染分页
                renderPage(res.total)
            }

        })

    }
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        let timer = `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
        return timer

        function padZero(n) {
            return n > 9 ? n : '0' + n
        }

    }



    let form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: "/my/cate/list",
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('初始化类别失败！')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 调用渲染
                form.render()
            }


        })
    }

    $("#form-search").on('submit', function (e) {
        e.preventDefault()
        // 获取选项值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 为data赋值
        data.cate_id = cate_id
        data.state = state
        // 渲染
        initTable()
    })


    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: data.pagesize, // 每页显示几条数据
            curr: data.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 5, 10, 100],


            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                data.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                data.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                if (!first) {
                    initTable()
                }
            }
        })
    }




    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let len = $('.btn-delete').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'DELETE',
                url: '/my/article/info?id=' + id,
                // data: {
                //     id: id
                // },

                success(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1
                    }
                    layer.close(index);
                    initTable()
                }

            })
        })

    })
})