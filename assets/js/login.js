$(function () {
  // 要为两个a链接：去登陆 去注册 绑定点击事件 显示和隐藏
  // 点击 “去注册” 的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()//去注册隐藏
    $('.reg-box').show()
  })

  // 点击 “去登录 ” 的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()//去注册显示
    $('.reg-box').hide()
  })

  //从layui 身上获取一个 form 对象
  var form = layui.form //导入 layui的js 就可以使用 layui.form
  var layer = layui.layer
  //通过 form.verify() 函数自定义校验规则
  form.verify({
    //自定义了一个叫 pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到的是 确认密码框中的内容
      //还需要拿到 密码框中的内容 然后进行一次 = 的判断 ，如果判断失败 则return一个提示消息即可
      //找密码框的父节点
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一致，请重新输入'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //1.阻止默认的提交行为
    e.preventDefault()
    //2.发起 ajax的 post 请求 三个参数： url地址 请求的参数对象  function回调
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      //模拟人的点击行为 注册成功后 自动进入到登录页面
      $('#link_login').click()
    })
  })

  //监听登录表单的监听事件
  $('#form_login').submit(function (e) {
    //阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      //this 指的是当前表单的对象
      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        console.log(res.token);
        //将 登录成功得到的 token 字符串 保存到  localStorage 中
        //服务器会给一个 token 值，有权限的接口都要带这个 值 才能请求成功
        localStorage.setItem('token', res.token)
        //跳转到后台主页
        location.href = '/index.html'
      }
    });
  })
})