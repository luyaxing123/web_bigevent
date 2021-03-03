$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) { //注意这个 value 就是你把这个规则给哪个文本框了，你输入的值就可以通过 value 来拿到
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    // 给表单绑定一个 submit 事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefult()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                // 下面这个是 jquery 元素，通过这个方法转换成原生的dom元素，就可以 调用 form 表单的 reset 方法
                //重置表单
                $('layui-form')[0].reset()
            }
        })
    })
})