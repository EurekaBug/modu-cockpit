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
                tooltip: {
                    trigger: 'item',
                },
                // legend: {
                //     bottom: '0',
                //     orient: 'horizontal',
                // },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        // radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: 40,
                        //         fontWeight: 'bold',
                        //     },
                        // },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' },
                        ],
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
