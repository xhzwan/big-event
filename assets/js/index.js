$(function () {
    getUserInfo()
})
let layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.code !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },

    })
}
// 渲染头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录？', {
        icon: 3,
        title: '提示'
    },
        function (index) {
            // 清空token
            localStorage.removeItem('token')
            // 跳转登录页
            location.href = '/login.html'
            // 取消
            layer.close(index)
        })
})




