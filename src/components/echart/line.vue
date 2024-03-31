<template>
    <div class="container">
        <div :id="id" class="mychart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props: {
        id: {
            type: String,
            default: 'myChart',
        },
    },
    setup(props) {
        onMounted(() => {
            const chartDom = document.getElementById(props.id);
            const myChart = echarts.init(chartDom);
            const option = {
                grid: {
                    left: '15%',
                    right: '5%',
                    bottom: '20%',
                    top: '20%',
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    // axisLabel: {
                    //     fontSize: 12, // rotate: 45
                    //     interval: 0, // 设置文字间隔 0强制显示所有文字
                    //     overflow: 'break', // 设置文字溢出处理方式
                    // },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line',
                    },
                ],
            };
            myChart.setOption(option);

            const observer = new ResizeObserver(myChart.resize);
            observer.observe(chartDom);
        });
    },
};
</script>

<style scoped>
.container {
    width: 200px;
    height: 200px;
    resize: both;
    margin: 0 auto;
}

.mychart {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>
