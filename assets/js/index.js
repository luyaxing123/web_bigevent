// $(function () {
//     //调用方法 getUserInfo 获取用户信息
//     getUserInfo()

//     $('#btnLogout').on('click', function () {
//         // console.log('btn'); 如果打印出来表示绑定事件成功

//         var layer = layui.layer
//         // 点击按钮，实现退出功能
//         $('#btnLogout').on('click', function () {
//             // 提示用户是否确认退出
//             layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
//                 //do something
//                 // 1. 清空本地存储中的 token 下次登录时方便
//                 localStorage.removeItem('token')
//                 // 2. 重新跳转到登录页面
//                 location.href = '/login.html'

//                 // 关闭 confirm 询问框
//                 layer.close(index)
//             })
//         })
//     })
// })
// // 有权限的接口
// // 获取用户基本信息
// function getUserInfo() {
//     $.ajax({
//         method: 'GET',
//         url: '/my/userinfo',
//         //headers就是 请求头 配置对象
//         // 为什么要设置请求头？以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
//         // headers: {
//         //     Authorization: localStorage.getItem('token') || ''
//         // },
//         success: function (res) {
//             // console.log(res);
//             if (res.status !== 0) {
//                 return layui.layer.msg('获取用户信息失败')
//             }
//             // 因为渲染头像的步骤有点长，所以我们封装成一个方法，然后进行调用即可
//             renderAvatar(res.data)
//         },
//         // 不论成功还是失败，都会调用这个 complete 函数
//         // 难道每次验证用户是否登陆成功时都要把这些代码粘过去吗? no

//         // 可以写到API里面 ajax里面
//         // complete: function (res) {
//         //     // console.log('执行了complete 回调');
//         //     // console.log(res);
//         //     // 在 complete 函数中 可以使用 responseJSON 拿到服务器响应回来的数据
//         //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
//         //         // 1.强制清空 token
//         //         localStorage.removeItem('token')
//         //         // 2.强制停留在 登录页面
//         //         location.href = '/login.html'
//         //     }
//         // }
//     })
// }
// // 用 user 来接收
// function renderAvatar(user) {
//     // 1.获取用户的名称
//     var name = user.nickname || user.username
//     // 2.设置欢迎的文本
//     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//     // 3.按需渲染用户的头像
//     if (user.user_pic !== null) {
//         // 3.1 渲染图片图像  把文本头像隐藏，把图片图像展示出来 src路径
//         $('.layui-nav-img').attr('src', user.user_pic).show()
//         $('.text-avatar').hide()
//     } else {
//         // 3.2 渲染文本头像
//         $('.layui-nav-img').hide()
//         var first = name[0].toUpperCase() //获取第一个字符 英文的话 大写
//         $('.text-avatar').html(first).show() //文本头像的第一个字符显示出来
//     }
// }
$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //   // console.log('执行了 complete 回调：')
        //   // console.log(res)
        //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 1. 强制清空 token
        //     localStorage.removeItem('token')
        //     // 2. 强制跳转到登录页面
        //     location.href = '/login.html'
        //   }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}
