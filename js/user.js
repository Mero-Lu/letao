$(function($){
    //   渲染表格 
    // console.log(111)
    // 当前页
    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;

    render();
    // 渲染页面
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
                // console.log(info);
                var htmlstr = template('tpl',info);
                $('.lt_content tbody').html(htmlstr);

                // 配置分页
                $('#paginator').bootstrapPaginator({
                    // 指定当前版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage : currentPage,
                    // 设置总页数
                    totalPages : Math.ceil(info.total / info.size),
                    // 当页面被点击时触发
                    onPageClicked: function(a,b,c,page){
                        currentPage = page;
                        render();  //重新渲染页面
                    }
                })
            }
        }) 
    }
    // 通过事件委托,注册事件,控制模态框的显示
    $('.lt_content tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        // 获取用户id
        var id = $(this).parent().data('id');
        // 获取 isDelete
        var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
        // console.log(id);

        // 先解绑, 再绑定事件, 可以保证只有一个事件绑定在 按钮上
        $('#usertBtn').off('click').on('click',function(){
            $.ajax({
                url : '/user/updateUser',
                type : 'post',
                data : {
                    id : id,
                    isDelete : isDelete,
                },
                dataType : 'json',
                success : function(info) {
                    // console.log(info);
                    if(info.success) {
                        // 模态框隐藏
                        $('#userModal').modal('hide');
                        // 重新渲染页面
                        render();
                    }
                }
            })
        })

    })

})