$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3008' + options.url

    // 权限的
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 回调
    options.complete = function (res) {
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转
            location.href = '/login.html'
        }
    }

})

