import { computed, defineComponent } from 'vue';
import './editor.scss';
import EditorBlock from './editor-block';
import Icon from '../components/icon';
import { $dialog } from '../components/Dialog';
import { $dropdown, DropdownItem } from '../components/Dropdown';
import deepcopy from 'deepcopy';
import { useMenuDragger } from './useMenuDragger';
import { useFocus } from './useFocus';
import { useBlockDragger } from './useBlockDragger';
import { useCommand } from './useCommand';
export default defineComponent({
    props: {
        modelValue: { type: Object },
    },
    emits: ['update:modelValue'], //触发事件
    setup(props, cts) {
        //预览的时候内容不能再操作了 可点击输入框
        const previewRef = ref(false);
        const editorRef = ref(true);

        const data = computed({
            get() {
                return props.modelValue;
            },
            set(val) {
                // console.log(val)
                cts.emit('update:modelValue', deepcopy(val));
            },
        });
        // console.log(data.value)

        const containerStyle = computed(() => ({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px',
        }));
        const config = inject('config');

        /* 1. 拖拽实现 */
        const containerRef = ref(null);
        const { dragstart, dragend } = useMenuDragger(containerRef, data); //拖拽实现

        /* 2. 实现获取焦点 */
        let { blockMousedown, focusData, containerMousedown, lastSelectBlock, clearBlockFocus } = useFocus(data, previewRef, (e) => {
            mousedown(e); //获取焦点
        });

        /* 3. 实现拖拽多个元素的功能 */
        let { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data);

        const { commands } = useCommand(data, focusData);
        const buttons = [
            { label: '撤销', icon: 'Back', handler: () => commands.undo() },
            { label: '重做', icon: 'Right', handler: () => commands.redo() },
            {
                label: '导入',
                icon: 'DocumentAdd',
                handler: () => {
                    $dialog({
                        header: '导入json使用',
                        content: '',
                        footer: true,
                        onConfirm(text) {
                            // data.value = JSON.parse(text);//无法保留历史操作记录
                            commands.updateContainer(JSON.parse(text));
                        },
                    });
                },
            },
            {
                label: '导出',
                icon: 'DocumentRemove',
                handler: () => {
                    $dialog({
                        header: '导出json使用',
                        content: JSON.stringify(data.value),
                    });
                },
            },
            {
                label: '置顶',
                icon: 'CaretTop',
                handler: () => {
                    commands.placeTop();
                },
            },
            {
                label: '置底',
                icon: 'CaretBottom',
                handler: () => {
                    commands.placeBottom();
                },
            },
            {
                label: '删除',
                icon: 'Delete',
                handler: () => {
                    commands.delete();
                },
            },
            {
                label: () => (previewRef.value ? '编辑' : '预览'),
                icon: () => (previewRef.value ? 'Edit' : 'View'),
                handler: () => {
                    // debugger;
                    previewRef.value = !previewRef.value;
                    clearBlockFocus(); //清除焦点
                },
            },
            {
                label: '关闭',
                icon: 'Close',
                handler: () => {
                    editorRef.value = false;
                    clearBlockFocus();
                },
            },
        ];

        //右键菜单
        const onContextMenuBlock = (e, block) => {
            e.preventDefault();

            $dropdown({
                el: e.target, //触发的元素
                content: () => {
                    return (
                        <>
                            <DropdownItem label="置顶" icon="CaretTop" onClick={() => commands.placeTop()}></DropdownItem>
                            <DropdownItem label="置底" icon="CaretBottom" onClick={() => commands.placeBottom()}></DropdownItem>
                            <DropdownItem
                                label="查看"
                                icon="View"
                                onClick={() => {
                                    $dialog({
                                        header: '查看节点数据',
                                        content: JSON.stringify(block),
                                    });
                                }}></DropdownItem>
                            <DropdownItem
                                label="导入"
                                icon="DocumentAdd"
                                onClick={() => {
                                    $dialog({
                                        header: '导入节点数据',
                                        content: JSON.stringify(block),
                                        footer: true,
                                        onConfirm(text) {
                                            text = JSON.parse(text); //无法保留历史操作记录
                                            commands.updateBlock(text, block);
                                        },
                                    });
                                }}></DropdownItem>
                            <DropdownItem label="删除" icon="Delete" onClick={() => commands.delete()}></DropdownItem>
                        </>
                    );
                },
            });
        };
        return () =>
            !editorRef.value ? (
                <>
                    <div class="editor-container-canvas__content" style={containerStyle.value} style="margin:0">
                        {data.value.blocks.map((block, index) => (
                            <EditorBlock class={'editor-block-preview'} block={block}></EditorBlock>
                        ))}
                    </div>
                    <div>
                        <ElButton type="primary" onClick={() => (editorRef.value = true)}>
                            继续编辑
                        </ElButton>
                    </div>
                </>
            ) : (
                <div class="editor">
                    <div class="editor-left">
                        {/* 根据注册列表 渲染对应内容 可是实现h5的拖拽*/}
                        {config.componentList.map((component) => (
                            <div class="editor-left-item" draggable onDragstart={(e) => dragstart(e, component)} onDragend={dragend}>
                                <span>{component.label}</span>
                                <div>{component.preview()}</div>
                            </div>
                        ))}
                    </div>
                    <div class="editor-top">
                        {buttons.map((btn, index) => {
                            const icon = typeof btn.icon === 'function' ? btn.icon() : btn.icon;
                            const label = typeof btn.label === 'function' ? btn.label() : btn.label;
                            return (
                                <div class="editor-top-button" key={index} onClick={btn.handler}>
                                    <Icon key={icon} v-model:icon={icon}></Icon>
                                    <i style="font-style: normal;">{label}</i>
                                </div>
                            );
                        })}
                    </div>
                    <div class="editor-right">属性控制栏目</div>
                    <div class="editor-container">
                        {/* 负责产生滚动条 */}
                        <div class="editor-container-canvas">
                            {/* 产生内容区域 */}
                            <div class="editor-container-canvas__content" style={containerStyle.value} ref={containerRef} onMousedown={containerMousedown}>
                                {data.value.blocks.map((block, index) => (
                                    <EditorBlock
                                        class={block.focus ? 'editor-block-focus' : ''}
                                        class={previewRef.value ? 'editor-block-preview' : ''}
                                        block={block}
                                        onMousedown={(e) => {
                                            blockMousedown(e, block, index);
                                        }}
                                        onContextmenu={(e) => onContextMenuBlock(e, block)}></EditorBlock>
                                ))}
                                {markLine.x !== null && <div class="line-x" style={{ left: markLine.x + 'px' }}></div>}
                                {markLine.y !== null && <div class="line-y" style={{ top: markLine.y + 'px' }}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
    },
});
