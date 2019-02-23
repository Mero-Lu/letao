
//  echarts  插件
$(function () {
    // 柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['销量', '人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [500, 120, 306, 180, 1000, 200]
        }, {
            name: '人数',
            type: 'bar',
            data: [300, 180, 506, 880, 1200, 760]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option);

    // 饼形图
    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option = {
        title : {
            text: '热门品牌销售',
            subtext: '2019年6月',
            x:'center'     //控制标题的位置
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','老北京','新百伦','阿迪王']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'老北京'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option);
})