$(function(){
  let form=layui.form
  let layer=layui.layer
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return '长度必须在1-6个字符之间'
      }
    } 
  })
  initUserInfo()
// 重置表单
$('#btnReset').on('click',function(e){
  e.preventDefault();
  initUserInfo()
})


// 监听表单的提交事件
$('.layui-form').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/my/userinfo',
    data:$(this).serialize(),
    success:function(res){
      console.log(res);
      if(res.status!==0){
        return layer.msg('更新用户信息失败')
      }
      layer.msg('更新用户信息成功')
      // 调用父页面中的方法，重新渲染用户的信息
      window.parent.getUserInfo()
    }
  })
})

// 初始化用户信息
  function initUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        console.log(res);
        if(res.status!==0){
          return layer.msg('获取用户信息失败')
        }
        // $('[name=username]').val(res.data.username)
        // 调用form.val()快速为表单赋值
        form.val('formUserInfo',res.data)
      }
    })
  }
})