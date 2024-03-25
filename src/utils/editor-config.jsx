// 列表区可以展示所有的物料
// key: 物料的唯一标识

import { ElButton, ElInput } from 'element-plus';
// import { preview } from "vite";

function createEditorConfig() {
    const componentList = [];
    const componentMap = {};

    return {
        componentList,
        componentMap,
        register: (component) => {
            componentList.push(component);
            componentMap[component.key] = component;
        },
    };
}
export let registerConfig = createEditorConfig();
// console.log(registerConfig);
//参数配置块
const createInputProp = (label) => ({
    type: 'input',
    label,
});
const createColorProp = (label) => ({
    type: 'color',
    label,
});
const createSelectProp = (label, option) => ({
    type: 'select',
    label,
    option,
});
registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('文本颜色'),
        size: createSelectProp('字体大小', [
            { label: '14px', val: '14px' },
            { label: '20px', val: '20px' },
            { label: '24px', val: '24px' },
        ]),
    },
});
registerConfig.register({
    label: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
    key: 'button',
    props: {
        text: createInputProp('按钮内容'),
        type: createSelectProp('按钮类型', [
            { label: '基础', val: 'primary' },
            { label: '成功', val: 'success' },
            { label: '警告', val: 'warning' },
            { label: '危险', val: 'danger' },
            { label: '文本', val: 'text' },
        ]),
        size: createSelectProp('按钮大小', [
            { label: '默认', val: '' },
            { label: '中等', val: 'medium' },
            { label: '小', val: 'small' },
            { label: '极小', val: 'mini' },
        ]),
    },
});
registerConfig.register({
    label: '输入框',
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: () => <ElInput placeholder="渲染输入框"></ElInput>,
    key: 'input',
});

//封装更多组件
