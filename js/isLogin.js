// 判断是否有登录, 未登录的拦截到登录页面
$(function($){
    $.ajax({
        type: 'get',
        url : '/employee/checkRootLogin',
        dataType: 'json',
        success: function(info) {
            // console.log(info);
            if(info.error == 400) {
                location.href = 'login.html';
            }
        }
    })

})