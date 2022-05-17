$(function () {
    $("#link_reg").on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $("#link_login").on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // layui 
    let form = layui.form
    // 自定义规则
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repass: function (value) {
            const pass = $('.reg-box [name=password]').val()
            if (pass !== value) {
                return '两次密码不一致'
            }
        }
    });
    let layer = layui.layer
    // 监听注册提交事件  
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
            repassword: $('#form_reg [name=repassword]').val()
        }

        $.ajax({
            type: 'post',
            url: '/api/reg',
            data,
            success({ code, message }) {
                if (code !== 0) {
                    return layer.msg(message)

                } else {
                    $('#link_login').click()
                    return layer.msg('注册成功，请登录！')

                }

            }

        })
    })
    // 登录的ajax请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')

                // 鉴权
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})