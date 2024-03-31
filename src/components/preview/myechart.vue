<template>
    <div ref="preChart" class="mychart"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    setup() {
        onMounted(() => {
            const { proxy } = getCurrentInstance();
            const chartDom = proxy.$refs.preChart;
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
.mychart {
    width: 200px;
    height: 200px;
    margin: 0 auto;
}
</style>
