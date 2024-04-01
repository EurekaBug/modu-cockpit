// 列表区可以展示所有的物料
// key: 物料的唯一标识

import { ElButton, ElInput } from 'element-plus';
// import { preview } from "vite";
import Range from '../components/Range';
import LineChart from '../components/echart/line.vue';
import BarChart from '../components/echart/bar.vue';
import PieChart from '../components/echart/pie.vue';


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
    console.log(componentList);
    console.log(componentMap);
}
export let registerConfig = createEditorConfig();
// console.log(registerConfig);
//参数配置块
const createInputProp = (label) => ({
    type: 'input',
    label,
    // default: '',
});
const createColorProp = (label) => ({
    type: 'color',
    label,
    // default: '#000',
});
const createSelectProp = (label, option) => ({
    type: 'select',
    label,
    option,
    // default: option[0].val,
});
const createSwitchProp = (label) => ({
    type: 'switch',
    label,
    // default: false,
});
registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: ({ props }) => <span style={{ color: props.color, fontSize: props.size }}>{props.text || '文字内容'}</span>,
    key: 'text',
    props: {
        text: createInputProp(['文本内容']),
        color: createColorProp(['文本颜色']),
        size: createSelectProp(['字体大小'], [
            { label: '14px', val: '14px' },
            { label: '20px', val: '20px' },
            { label: '24px', val: '24px' },
        ]),
    },
});
registerConfig.register({
    label: '按钮',
    resize: {
        width: true,
        height: true,
    },
    preview: () => <ElButton>预览按钮</ElButton>,
    render: ({ props, size }) => (
        <ElButton style={{ height: size.height + 'px', width: size.width + 'px' }} type={props.type} size={props.size}>
            {props.text || '按钮内容'}
        </ElButton>
    ),
    key: 'button',
    props: {
        text:createInputProp(['按钮内容1','按钮内容2']),//  [createInputProp('按钮内容1'),createInputProp('按钮内容2')]
        /* 
        [{type: 'input',label:按钮内容1,},{type: 'input',label:按钮内容2,}]       {type: 'input',label:[按钮内容1,按钮内容2]}  
        */
        type: createSelectProp(['按钮类型'], [
            { label: '基础', val: 'primary' },
            { label: '成功', val: 'success' },
            { label: '警告', val: 'warning' },
            { label: '危险', val: 'danger' },
            { label: '文本', val: 'text' },
        ]),
        size: createSelectProp(['按钮大小'], [
            { label: '默认', val: '' },
            { label: '大', val: 'large' },
            { label: '小', val: 'small' },
        ]),
    },
});
registerConfig.register({
    label: '输入框',
    resize: {
        width: true,
    },
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: ({ model, size }) => <ElInput placeholder="渲染输入框" {...model.default} style={{ width: size.width + 'px' }}></ElInput>,
    key: 'input',
    model: {
        default: '绑定字段',
    },
});
registerConfig.register({
    label: '范围选择器',
    key: 'range',
    resize: {
        width: true,
    },
    preview: () => <Range></Range>,
    render: ({ model, size }) => (
        <Range
            {...{
                start: model.start.modelValue,
                end: model.end.modelValue,
                'onUpdate:start': model.start['onUpdate:modelValue'],
                'onUpdate:end': model.end['onUpdate:modelValue'],
            }}
            style={{ width: size.width + 'px' }}></Range>
    ),
    model: {
        start: '开始范围字段',
        end: '结束范围字段',
    },
});
registerConfig.register({
    label: '折线图',
    key: 'line',
    resize: {
        width: true,
        height: true,
    },
    // preview: () => <PreLineChart></PreLineChart>,
    preview: () => <LineChart id={'chart' + Math.random()}></LineChart>,
    render: ({ props, size }) => <LineChart style={{ height: size.height + 'px', width: size.width + 'px' }} data={props} size={props.size} id={'chart' + Math.random()}></LineChart>,
    props: {
        text: createInputProp(['标题内容']),
        // type: createSelectProp('按钮类型', [
        //     { label: '基础', val: 'primary' },
        //     { label: '成功', val: 'success' },
        //     { label: '警告', val: 'warning' },
        //     { label: '危险', val: 'danger' },
        //     { label: '文本', val: 'text' },
        // ]),
        switch: createSwitchProp(['x轴','y轴']),
        // size: createSelectProp('按钮大小', [
        //     { label: '默认', val: '' },
        //     { label: '大', val: 'large' },
        //     { label: '小', val: 'small' },
        // ]),
    },
});
registerConfig.register({
    label: '柱状图',
    key: 'bar',
    resize: {
        width: true,
        height: true,
    },
    preview: () => <BarChart id={'chart' + Math.random()}></BarChart>,
    render: ({ props, size }) => <BarChart style={{ height: size.height + 'px', width: size.width + 'px' }} size={props.size} id={'chart' + Math.random()}></BarChart>,
    
});
registerConfig.register({
    label: '饼图',
    key: 'pie',
    resize: {
        width: true,
        height: true,
    },
    preview: () => <PieChart id={'chart' + Math.random()}></PieChart>,
    render: ({ props, size }) => <PieChart style={{ height: size.height + 'px', width: size.width + 'px' }} size={props.size} id={'chart' + Math.random()}></PieChart>,
    
});
//封装更多组件
