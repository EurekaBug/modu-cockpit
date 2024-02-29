import {computed,defineComponent} from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'
export default defineComponent({
    props: {
        modelValue:{type:Object}
    },
    setup(props){
        const data = computed({
            get(){
                return props.modelValue
            }
        })
        // console.log(data.value)

        const containerStyle = computed(()=>({
            width: data.value.contaniner.width + 'px',
            height: data.value.contaniner.height + 'px'
        }))
        const config = inject('config')
        return ()=>(
            <div class="editor">
                <div class="editor-left">
                    {/* 根据注册列表 渲染对应内容 */}
                    {config.componentList.map(component=>(
                        <div class="editor-left-item">
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
                        <div class="editor-container-canvas__content" style={containerStyle.value}>
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