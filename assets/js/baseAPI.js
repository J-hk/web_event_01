// 1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
// 2.测试环境服务器地址
// 3.生产环境服务器地址

// 拦截所有ajax请求：grt/post/ajax
//    处理参数
$.ajaxPrefilter(function(option) {
    option.url = baseURL + option.url;


    // 对需要权限的接口配置头信息   
    // 必须以my开头才行
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3.拦截所有响应，判断身份认证信息
    option.complete = function(res) {
        // console.log(res);
        // 判断，如果是身份认证失败，跳转回登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.删除本地token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = '/login.html';
        }
    }
})