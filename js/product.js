
$(function ($) {
    var currentPage = 1;  //当前页
    var pageSize = 2;   //每页多少条
    var picArr = [];  //用来存放有图片的路径
    // 渲染数据
    render();
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('proTpl', info);
                $('tbody').html(htmlStr);

                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,  //版本号
                    currentPage: currentPage,  //当前页
                    totalPages: Math.ceil(info.total / info.size),  //总页数
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 让模态框显示
    $('.productM').on('click', function () {
        $('#productModal').modal('show');
        // 获取二级分类的数据,渲染页面
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 1000,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('productTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    // 给下拉菜单添加可选功能
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取a标签上的文本和id
        var txt = $(this).text();
        var id = $(this).data('id');
        $('#dropdownText').text(txt);
        $('[name="brandId"]').val(id);
        // 将隐藏域校验状态更新成 VALID 成功状态
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    // 图片上传 初始化
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            var picUrl = data.result.picAddr;
            // console.log(data.result);
            picArr.unshift(data.result);
            $('#imgBox').prepend('<img style="height: 100px;" src="' + picUrl + '" alt="">');
            // console.log(picArr);
            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            if(picArr.length == 3) {
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }
        }
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
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    // 1  10  111  1111
                    // 正则校验, 必须非零开头的数字
                    // \d  0-9 数字
                    // ?   表示 0 次 或 1 次
                    // +   表示 1 次 或 多次
                    // *   表示 0 次 或 多次
                    // {n} 表示 出现 n 次
                    // {n, m}  表示 出现 n ~ m 次
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx 格式,  xx 是两位数字, 例如: 32-40 '
                    }
                }
            },
            oldPrice: {
                validators: {
                  notEmpty: {
                    message: '请输入商品原价'
                  }
                }
              },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            // 标记图片是否上传满三张的
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            }
        }
    })

    // 表单验证成功后的回调  发送ajax
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        var paramsStr = $('#form').serialize();
        paramsStr += '&picArr=' + JSON.stringify(picArr);
        // console.log(paramsStr);
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data : paramsStr,
            success: function(info){
                // console.log(info);
              if(info.success){
                    // 关闭模态框
                $('#productModal').modal('hide');
                currentPage = 1;
                render();
                 // 重置表单元素的状态和内容
                $('#form').data('bootstrapValidator').resetForm(true);
                $('#dropdownText').text('请选择二级分类');
                $('#imgBox img').remove();
                picArr = [];
              }
            }
        })
    })


})