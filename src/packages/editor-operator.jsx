import { ElColorPicker, ElForm, ElFormItem } from 'element-plus';

export default defineComponent({
    props: {
        block: {
            //最后选中的block
            type: Object,
        },
        data: {
            //当前所有数据
            type: Object,
        },
    },
    setup(props, ctx) {
        const config = inject('config');
        return () => {
            let content = [];
            if (!props.block) {
                content.push(
                    <>
                        <ElFormItem label="容器宽度">
                            <ElInputNumber></ElInputNumber>
                        </ElFormItem>
                        <ElFormItem label="容器高度">
                            <ElInputNumber></ElInputNumber>
                        </ElFormItem>
                    </>,
                );
            } else {
                let component = config.componentMap[props.block.key];
                if (component && component.props) {
                    //{text:{type:'xxx'},color:{},size:{}}
                    content.push(
                        Object.entries(component.props).map(([propName, propConfig]) => {
                            return (
                                <ElFormItem label={propConfig.label}>
                                    {{
                                        input: () => <ElInput></ElInput>,
                                        color: () => <ElColorPicker></ElColorPicker>,
                                        select: () => (
                                            <ElSelect>
                                                {propConfig.option.map((option) => {
                                                    return <ElOption label={option.label} value={option.value}></ElOption>;
                                                })}
                                            </ElSelect>
                                        ),
                                    }[propConfig.type]()}
                                </ElFormItem>
                            );
                        }),
                    );
                }
            }
            return (
                <ElForm labelPosition="top" style="padding:30px">
                    {content}
                    <ElFormItem>
                        <ElButton type="primary">应用</ElButton>
                        <ElButton>重置</ElButton>
                    </ElFormItem>
                </ElForm>
            );
        };
    },
});
