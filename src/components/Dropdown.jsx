import { defineComponent, createVNode, render } from 'vue';
import Icon from './icon';
export const DropdownItem = defineComponent({
    props: {
        label: String,
        icon: String,
    },
    setup(props) {
        // const elIcon = resolveComponent(props.icon);
        let { label, icon } = props;
        let hide = inject('hide');
        return () => (
            <div class="dropdown-item" onClick={hide}>
                {/* {h(elIcon)} */}
                <span>{label}</span>
            </div>
        );
    },
});
const DropdownComponent = defineComponent({
    props: {
        option: {
            type: Object,
        },
    },
    setup(props, ctx) {
        const state = reactive({
            option: props.option, //用户给组件的属性
            isShow: false,
            top: 0,
            left: 0,
        });
        ctx.expose({
            //暴露方法
            showDropdown(option) {
                state.option = option;
                state.isShow = true;
                let { top, left, height } = option.el.getBoundingClientRect();
                state.top = top + height;
                state.left = left;
            },
        });
        provide('hide', () => {
            state.isShow = false;
        });
        const classes = computed(() => [
            'dropdown',
            {
                'dropdown-isShow': state.isShow,
            },
        ]);
        const styles = computed(() => ({
            top: state.top + 'px',
            left: state.left + 'px',
        }));
        const el = ref(null);
        const onMousedownDocument = (e) => {
            if (!el.value.contains(e.target)) {
                //点击dropdown组件内部不关闭
                state.isShow = false;
            }
        };
        onMounted(() => {
            //事件的传递行为是先捕获再冒泡 之前已经阻止了事件冒泡
            document.body.addEventListener('mousedown', onMousedownDocument, true);
        });
        onBeforeUnmount(() => {
            document.body.removeEventListener('mousedown', onMousedownDocument);
        });
        return () => {
            return (
                <div class={classes.value} style={styles.value} ref={el}>
                    {state.option.content()}
                </div>
            );
        };
    },
});

let vm;
export function $dropdown(option) {
    //手动挂载组件
    if (!vm) {
        let el = document.createElement('div');
        vm = createVNode(DropdownComponent, { option }); //创建虚拟节点

        document.body.appendChild((render(vm, el), el)); //渲染真实节点在页面上
    }
    //将组件渲染到el上
    let { showDropdown } = vm.component.exposed;
    showDropdown(option); //其他说明组件已经有了只需要显示出来
}
