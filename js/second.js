
$(function($){
    var currentPage = 1;  // 当前页数
    var pageSize = 5;  //一页多少条

    render();
    // 渲染数据
    function render(){
        $.ajax({
            url : '/category/querySecondCategoryPaging',
            type : 'get',
            data : {
                page : currentPage,
                pageSize : pageSize
            },
            dataType : 'json',
            success : function(info) {
                // console.log(info);
                var htmlStr = template('secondTpl',info);
                $('tbody').html( htmlStr );
                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion : 3,  //版本号
                    currentPage : currentPage,   //设置当前页数
                    totalPages : Math.ceil(info.total / info.size),   //总页数
                    onPageClicked : function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 让模态框显示
    $('.secondL').on('click',function(){
        $('#secondModal').modal('show');

        // 发送请求, 获取一级分类的全部数据, 将来用于渲染  点击添加分类的时候就要渲染好
        // 根据已有接口, 模拟获取全部数据的接口, page:1  pageSize:100
        $.ajax({
            url : '/category/queryTopCategoryPaging',
            type : 'get',
            data : {
                page : 1,
                pageSize : 1000
            },
            dataType : 'json',
            success : function(info) {
                // console.log(info);
                var htmlStr = template('done',info);
                $('.dropdown-menu').html( htmlStr );
            } 
        })
    })

    // 给下拉菜单添加可选功能
    $('.dropdown-menu').on('click','a',function(){
        // 获取 a 的文本
        var txt = $(this).text();
        $('#dropdownText').text(txt);
    })
    
})