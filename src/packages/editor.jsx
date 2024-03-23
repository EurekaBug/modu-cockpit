import { computed, defineComponent } from 'vue';
import './editor.scss';
import EditorBlock from './editor-block';
import Icon from '../components/icon';
import { $dialog } from '../components/dialog';
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
        let { blockMousedown, focusData, containerMousedown, lastSelectBlock } = useFocus(data, (e) => {
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
<<<<<<< HEAD
            {
                label: '删除',
                icon: 'Delete',
                handler: () => {
                    commands.delete();
                },
            },
=======
>>>>>>> 100e9f284f0ae0190eeb51106915ad29b054bb92
        ];

        return () => (
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
                        return (
                            <div class="editor-top-button" key={index} onClick={btn.handler}>
                                <Icon icon={btn.icon}></Icon>
                                <i style="font-style: normal;">{btn.label}</i>
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
                                    block={block}
                                    // onMouseup={() => {
                                    //     console.log('onMouseup');
                                    // }}
                                    onMousedown={(e) => {
                                        blockMousedown(e, block, index);
                                    }}></EditorBlock>
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
