//入口函数
$(function() {
    // 点击去注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on("click", function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 点击去登录，隐藏注册区域，显示登录区域
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })
})

// 2.自定义验证规则
var form = layui.form;
form.verify({
    // 密码规则
    pwd: [
        /^[\S]{6,16}$/,
        "密码必须6~16位，且不能输入空格"
    ],
    // 确认密码规则
    repwd: function(value) {
        // 选择器必须带空格，选择的是后代中的input，name属性值为password的那一个标签
        var pwd = $(".reg-box input[name=password]").val();
        // 比较
        if (value !== pwd) {
            return "两次输入的密码不一致!";
        }
    }
});

// 3.注册功能
var layer = layui.layer;
$("#form_reg").on("submit", function(e) {
    // 阻止表单提交
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val(),
        },
        success: function(res) {
            // 返回状态判断
            if (res.states != 0) {
                return layer.msg(res.message);
            }
            // 提交成功后处理代码
            layer.msg("注册成功，请登录！");
            // 手动切换到登录表单
            $("#link_login").click();
            // 重置form表单
            $("#form_reg")[0].reset();
        }
    })
});

//4.
$("#form_login").submit(function(e) {
    // 阻止表单提交
    e.preventDefault();
    // 发送ajax
    $.ajax({
        method: "POST",
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
            // 返回状态判断
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 提交成功后处理代码
            layer.msg("恭喜您，登录成功！");
            // 手动切换到登录表单
            localStorage.setItem("token", res.token);
            // 重置form表单
            location.href = "/index.html";
        }
    })
});