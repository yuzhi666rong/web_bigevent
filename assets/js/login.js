$(function () {
  // 点击注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // layui中获取form对象
  // let form=layui.form
  // 通过form.verify()自定义校验规则
  layui.form.verify({
    pass: [
      /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
    ],
    // 校验将此密码是否一致
    repass: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框的内容
      let pass = $('.reg-box [name="password"]').val()
      // 然后进行一次等于的判断
      if (pass !== value) {
        return '两次密码不一致'
      }
      // 如果判断失败，则return一个提示消息
    }
  })
let layer=layui.layer
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    let data={ username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data,
      function (res) {
        if(res.status==0){
          $('#link_login').click()
        }
        return layer.msg(res.message)
        // 模拟人的点击行为
      })
      
  })
  // 监听注册表单的提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的token字符串，保存到localStoragezhong
        localStorage.setItem('token',res.token)
        console.log(res.token);
        location.href='/index.html'
      }
    })
  })
  // 设置api默认路径
  $.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
  })
})