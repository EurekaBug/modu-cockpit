import {computed,defineComponent} from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'
import deepcopy from 'deepcopy'
import {useMenuDragger} from './useMenuDragger'
export default defineComponent({
    props: {
        modelValue:{type:Object}
    },
    emits:['update:modelValue'],//触发事件
    setup(props,cts){
        const data = computed({
            get(){
                return props.modelValue
            },
            set(val){
                // console.log(val)
                cts.emit('update:modelValue',deepcopy(val))
            }
            
        })
        // console.log(data.value)

        const containerStyle = computed(()=>({
            width: data.value.contaniner.width + 'px',
            height: data.value.contaniner.height + 'px'
        }))
        const config = inject('config')

        /* 拖拽实现 */
        const containerRef = ref(null)
        const {dragstart,dragend} = useMenuDragger(containerRef,data)//拖拽实现
        return ()=>(
            <div class="editor">
                <div class="editor-left">
                    {/* 根据注册列表 渲染对应内容 可是实现h5的拖拽*/}
                    {config.componentList.map(component=>(
                        <div 
                            class="editor-left-item" 
                            draggable
                            onDragstart={e=>dragstart(e,component)}
                            onDragend={dragend}
                        >
                            <span>{component.label}</span>
                            <div>{component.preview()}</div>
                        </div>
                    ))}
                </div>
                <div class="editor-top">菜单栏</div>
                <div class="editor-right">属性控制栏目</div>
                <div class="editor-container">
                    {/* 负责产生滚动条 */}
                    <div class="editor-container-canvas">
                        {/* 产生内容区域 */}
                        <div class="editor-container-canvas__content" style={containerStyle.value} ref={containerRef}>
                            {
                                (data.value.blocks || []).map((block,index)=>(
                                    <EditorBlock block={block}></EditorBlock>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})