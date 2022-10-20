$(function () {
  // 获取用户基本信息
  getUserInfo()

  $('#tuichu').on('click', function () {
    console.log('ok');
    let layer = layui.layer
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //1.清空本地存储中的 token
      localStorage.removeItem('token')
      //2.重新跳转到登陆页面
      location.href = '/login.html'
      // 关闭confirm
      layer.close(index);
    });
  })
})
  // 获取用户的基本信息
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        // 调用渲染用户的头像
        renderAvatat(res.data)
      },
      // 无论成功还是失败都会调用
    })
  }
  
  function renderAvatat(user) {
    // 获取用户名称
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 判断是否有头像
    if (user.user_pic !== null) {
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      $('.text-avatar').html(first)
    }
  }

