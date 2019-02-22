
// 开启进度条功能
$(document).ajaxStart(function(){
    NProgress.start();
})
// 进度条结束
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500);
})
