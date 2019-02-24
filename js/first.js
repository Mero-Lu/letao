
// 一级分类页面
$(function ($) {
    var currentPage = 1;  //当前页
    var pageSize = 5;  //一页多少条
    // 发送ajax,渲染页面
    render();
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info)
                var htmlStr = template('firstTpl', info);
                $('tbody').html(htmlStr);
                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 指定当前版本
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: currentPage,
                    // 设置总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 当页面被点击时触发
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();  //重新渲染页面
                    }
                })
            }
        })
    }

    // 让模态框显示
    $('.lt_content .addL').on('click', function () {
        $('#addModal').modal('show');  //让模态框显示

    })
    // 3. 完成添加校验
    $('#form').bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置需要校验的字段列表
        fields: {
            categoryName: {
                // 配置校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    });
    // 注册表单验证成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url : '/category/addTopCategory',
            type : 'post',
            data : $('#form').serialize(),// jq的表单序列化
            dataType : 'json',
            success : function(info) {
                // console.log(info);
                if(info.success){
                    // 关闭模态框
                    $('#addModal').modal('hide');  //让模态框隐藏
                    currentPage = 1; //重新渲染页面,显示第一页
                    render();
                    // 让form表单里面的内容重置
                    $(form).data('bootstrapValidator').resetForm(true);
                }
            }
        })
    });

})