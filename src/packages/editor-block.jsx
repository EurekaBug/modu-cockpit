export default defineComponent({
    props: {
        block: { type: Object },
    },
    setup(props) {
        const blockStyle = computed(() => ({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: props.block.zIndex,
        }));
        const config = inject('config');
        // console.log(config)

        const blockRef = ref(null);
        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value;
            // console.log(offsetWidth, offsetHeight);
            if (props.block.alignCenter) {
                //只有松手的时候才会居中
                props.block.left -= offsetWidth / 2;
                props.block.top -= offsetHeight / 2;
                props.block.alignCenter = false;
            }
            props.block.width = offsetWidth;
            props.block.height = offsetHeight;
        });

        return () => {
            //获取组件
            const component = config.componentMap[props.block.key];
            //渲染组件
            const renderComponent = component.render();
            return (
                <div class="editor-block" style={blockStyle.value} ref={blockRef}>
                    {renderComponent}
                </div>
            );
        };
    },
});
