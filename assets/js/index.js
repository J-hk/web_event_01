// 入口函数
$(function() {
    // 1.获取用户信息
    getUserInfo();

    // 2.退出
    var layer = layui.layer;
    $('#btnLogout').on("click", function() {
        // 框架提供的询问框
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = "/login.html";
            // 关闭询问框
            layer.close(index);
        })
    })
})

// 获取用户信息封装
//   注意：位置写到入口函数外，后面代码中要用这个方法，但是要求这个方法是一个全局变量
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功，渲染用户头像信息
            renderAvatar(res.data);
        }
    })
}

//封装用户头像渲染函数
function renderAvatar(user) {
    // 1.用户名（昵称优先，没有就用username）
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".user-avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").html(text).show();
    }
}