
$(function ($) {
    var currentPage = 1;  // 当前页数
    var pageSize = 5;  //一页多少条

    render();
    // 渲染数据
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);
                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,  //版本号
                    currentPage: currentPage,   //设置当前页数
                    totalPages: Math.ceil(info.total / info.size),   //总页数
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 让模态框显示
    $('.secondL').on('click', function () {
        $('#secondModal').modal('show');

        // 发送请求, 获取一级分类的全部数据, 将来用于渲染  点击添加分类的时候就要渲染好
        // 根据已有接口, 模拟获取全部数据的接口, page:1  pageSize:100
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 1000
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('done', info);
                $('.dropdown-menu').html(htmlStr);

            }
        })
    })

    // 给下拉菜单添加可选功能
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取 a 的文本
        var txt = $(this).text();
        // 拿到categoryId
        var id = $(this).data('id');
        // console.log(id);
        $('#dropdownText').text(txt);
        // 将选中的 id 设置到 input 表单元素中
        $('[name="categoryId"]').val(id);

        // 重置校验状态
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    // 初始化表单校验
    $('#form').bootstrapValidator({
        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 3.指定校验字段
        fields: {
            // 一级分类的id
            categoryId: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                },
            },  // 图片的地址
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            },
            // 品牌名称
            brandName: {
                //校验规则
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
        }

    })

    // 配置图片上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data);
            // console.log(data.result.picAddr);  
            //   获取图片上传的地址
            var picAddr = data.result.picAddr;
            // 设置图片的地址
            $('#imgBox img').attr('src', picAddr);
            // 将图片地址存在隐藏域中
            $('[name="brandLogo"]').val(picAddr);
            // 重置校验状态
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    })

    // 注册校验成功事件,发送ajax
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info);
                // 关闭模态框
                $('#secondModal').modal('hide');
                // 重置表单里面的内容和校验状态
                $('#form').data("bootstrapValidator").resetForm( true );
                // 重新渲染第一页
                currentPage = 1;
                render();

                // 找到下拉菜单文本重置
                $('#dropdownText').text("请选择一级分类");
                // 找到图片重置
                $('#imgBox img').attr('src', 'images/none.png');
            }
        })
    });

})