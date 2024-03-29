import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
    setup() {
        const chartRef = ref(null);

        onMounted(() => {
            const chart = echarts.init(chartRef.value);
            // chart.resize({
            //     width: 400,
            //     height: 400,
            // });
            const options = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line',
                    },
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
            };

            chart.setOption(options);

            // 在组件卸载时销毁echarts实例，防止内存泄漏
            return () => {
                chart.dispose();
            };
        });

        return () => <div ref={chartRef} class="myechart" style={{ width: '200px', height: '200px' }} />;
    },
});
