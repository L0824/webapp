/**
 * 统计echarts图标
 */

var dom = document.getElementById("div_count1");
var myChart = echarts.init(dom);
option1 = null;

var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 10; i++) {
    xAxisData.push('类目' + i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

option1 = {
    title: {
        text: ''
    },
    legend: {
        data: ['bar', 'bar2'],
        align: 'center'
    },
    grid: {
            left: '2%',
            top: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
    toolbox: {
        // y: 'bottom',
    	show:false,
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
            show: false
        }
    },
    yAxis: {
    },
    series: [{
        name: '国内资料',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: '国外资料',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};
myChart.setOption(option1);