//注意：每次调用 $.get() 或$.post()或$.ajax这个 ()的时候 会先调用 ajaxPrefilter()这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) { //options 就是你调 ajax时传递的配置对象
    console.log(options.url);
    //在 发起真正的 ajax 请求之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);//效果一闪而过
})