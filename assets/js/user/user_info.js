// $(function () {
//     var form = layui.form
//     var layer = layui.layer
//     form.verify({
//         nickname: function (value) {
//             if (value.length > 6) {
//                 return '昵称长度必须在1 - 6个字符之间'
//             }
//         }
//     })

//     initUserInfo()
//     // 初始化用户的基本信息
//     function initUserInfo() {
//         $.ajax({
//             method: 'GET',
//             url: '/my/userinfo',
//             success: function (res) {
//                 if (res.status !== 0) {
//                     return layer.msg('获取用户信息失败')
//                 }
//                 console.log(res);

//                 // 调用 form.val() 快速为 表单赋值
//                 // 第一个参数是指 要给哪个表单赋值 第二个则是 具体的值
//                 // res.data 存着当前用户的 信息对象
//                 form.val('formUserInfo', res.data)
//             }
//         })
//     }


//     // 重置表单的数据
//     $('#btnReset').on('click', function (e) {
//         // 阻止表单的默认重置行为
//         e.preventDefault()
//         // 我们只需要再次调用  initUserInfo()  即可 因为在这个方法中，我们会重新发起一次ajax 请求，然后拿到用户的当前信息。接下来，我们再次调用 form.val() 方法，把我们用户的信息 重新填充到表单里面去。
//         // 就比如说，如果之前有 其他信息，ajax获取之后，点击重置，form.val() 就会把 之前的信息 放到对应的位置，改编过的值就消失了
//         initUserInfo()
//     })

// 监听表单的 提交事件  执行function 回调函数
// 注意 layui-form 是 class 前面加 .  不是加# !!
// $('.layui-form').on('submit', function (e) {
//     // 阻止表单的默认提交行为
//     e.preventDefault()
//     // 发起 ajax 数据请求
//     $.ajax({
//         method: 'POST',
//         url: '/my/userinfo',
//         // 还要指定 要发送到服务器的数据  数据呢 直接对这个 #layui-form 表单进行 序列化  $(this)就代表当前这个表单
//         // serialize() 方法通过序列化表单值，创建 URL 编码文本字符串
//         data: $(this).serialize(),
//         success: function (res) {
//             if (res.status !== 0) {
//                 // layer 是 弹出的那个 提示框
//                 return layer.msg('更新用户信息失败！')
//             }
//             layer.msg('更新用户信息成功！')

//         }
//     })
// })
$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})

