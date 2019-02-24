$(function($){
    //   渲染表格 
    // 当前页
    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;

    function render(){
        $.ajax({
            url : '/user/queryUser',
            type : 'get',
            data : {
                page : currentPage,
                pageSize : pageSize,
            },
            dataType : 'json',
            success : function(info){
                console.log(info);
                var htmlstr = template('tpl',info);
                $('.lt_content tbody').html(htmlstr);
            }
        }) 
    }


})