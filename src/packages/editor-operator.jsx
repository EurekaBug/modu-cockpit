import { ElColorPicker, ElForm, ElFormItem } from 'element-plus';
import deepcopy from 'deepcopy';
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
        updateContainer: {
            //更新容器的大小
            type: Function,
        },
        updateBlock: {
            //更新block的配置
            type: Function,
        },
    },
    setup(props, ctx) {
        const config = inject('config');
        const state = reactive({
            editData: {},
        });
        const reset = () => {
            if (!props.block) {
                state.editData = deepcopy(props.data.container);
            } else {
                state.editData = deepcopy(props.block);
            }
        };
        const apply = () => {
            if (!props.block) {
                //更改容器组件大小
                props.updateContainer({ ...props.data, container: state.editData });
            } else {
                //更改组件的配置
                props.updateBlock(state.editData, props.block);
            }
        };
        watch(() => props.block, reset, { immediate: true });
        return () => {
            let content = [];
            if (!props.block) {
                content.push(
                    <>
                        <ElFormItem label="容器宽度">
                            <ElInputNumber v-model={state.editData.width}></ElInputNumber>
                        </ElFormItem>
                        <ElFormItem label="容器高度">
                            <ElInputNumber v-model={state.editData.height}></ElInputNumber>
                        </ElFormItem>
                    </>,
                );
            } else {
                let component = config.componentMap[props.block.key];
                if (component && component.props) {//组件的属性配置
                    //{text:{type:'xxx'},color:{},size:{}}
                    debugger
                    content.push(
                        Object.entries(component.props).map(([propName, propConfig]) => {
                            return (
                                propConfig.label.map(label => {
                                    state.editData.props[propName] = state.editData.props[propName] || '';
                                    return (
                                    <ElFormItem label={label}>
                                        {{
                                            input: () => (
                                                <>
                                                    <ElInput v-model={state.editData.props[propName]}></ElInput>
                                                </>
                                            ),
                                            color: () => <ElColorPicker v-model={state.editData.props[propName] }></ElColorPicker>,
                                            select: () => (
                                                <ElSelect v-model={state.editData.props[propName]}>
                                                    {propConfig.option.map((option) => {
                                                        return <ElOption label={option.label} value={option.val}></ElOption>;
                                                    })}
                                                </ElSelect>
                                            ),
                                            switch: () => <ElSwitch v-model={state.editData.props[propName] }></ElSwitch>,
                                        }[propConfig.type]()}

                                    </ElFormItem>)
                                })
                            );
                        }),
                    );
                    debugger
                }
                if (component && component.model) {//model中的双向绑定字段
                    content.push(                           
                        //                                     default   标签名
                        Object.entries(component.model).map(([modelName, label]) => {
                            return <ElFormItem label={label}>
                                    <ElInput v-model={state.editData.model[modelName]}></ElInput>
                                </ElFormItem>
                        })
                    );
                }
            }
            return (
                <ElForm labelPosition="top" style="padding:30px">
                    {content}
                    <ElFormItem>
                        <ElButton type="primary" onClick={() => apply()}>
                            应用
                        </ElButton>
                        <ElButton onClick={reset}>重置</ElButton>
                    </ElFormItem>
                </ElForm>
            );
        };
    },
});
