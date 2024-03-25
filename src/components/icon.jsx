export default defineComponent({
    props: {
        icon: { type: String },
    },
    setup(props) {
        const elIcon = resolveComponent(props.icon);
        return () => {
            // return <el-icon>{h(elIcon)}</el-icon>;//小图标
            return h(elIcon); //大图标
        };
    },
});
