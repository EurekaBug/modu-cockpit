<template>
    <div>
        <!-- 为Echarts准备一个定义了宽高的dom -->
        <div :ref="`chart+${props.refKey}`" style="height: 400px"></div>
    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const props = defineProps(
    {
        option: Object,
    },
    {
        refKey: Number,
    },
);
const option = () => {
    return {
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
    };
};
onMounted(() => {
    const myChart = proxy.$echarts.init(proxy.$refs[`chart+${props.refKey}`]);
    myChart.setOption(props.option || option());
    // 根据页面大小自动响应图表大小
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});
</script>
