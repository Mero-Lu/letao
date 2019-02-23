
// 开启进度条功能
$(document).ajaxStart(function () {
    NProgress.start();
})
// 进度条结束
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
})

// 退出功能
$(function ($) {
    // 让模态框显示出来
    $('.lt_topbar .icon_logout').click(function () {
        // 让模态框显示, modal('show')
        // console.log(111)
        $('#logoutModal').modal('toggle');
    });
    // 账号退出功能
    $('#logoutBtn').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })

    })

    // 左侧二级菜单
    $('.category').on('click',function(){
        // 找到下一个兄弟元素切换显示
        $(this).next().stop().slideToggle();
    })


    // 左侧整体菜单的切换
    $('.lt_topbar .icon_menu').on('click',function(){
        // 让左侧整个菜单切换显示, 改左侧菜单的 left 值
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    })

})


