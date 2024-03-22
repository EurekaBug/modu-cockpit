import { events } from './events';
import deepcopy from 'deepcopy';
export function useCommand(data) {
    const state = {
        //前进后退的指针
        current: -1, //索引值
        queue: [], //存储命令的队列
        commands: {}, //命令映射表 undo:()=>{} redo:()=>{}
        commandArray: [], //所有命令的数组
        destroyArray: [], //销毁函数的数组
    };

    const registry = (command) => {
        state.commandArray.push(command);
        state.commands[command.name] = (...args) => {
            //命令名字对应的执行函数
            const { redo, undo } = command.excute(...args);
            redo();
            if (!command.pushQueue) {
                return;
            }
            let { queue, current } = state;

            //如果撤销之后又操作了 之前的操作就不应该存在
            if (queue.length > 0) {
                queue = queue.slice(0, current + 1); //截取当前指针之前的操作
                state.queue = queue;
            }
            queue.push({ redo, undo });
            state.current = current + 1;
        };
    };

    registry({
        name: 'redo',
        keyboard: 'ctrl+y',
        excute: () => {
            return {
                redo() {
                    let item = state.queue[state.current + 1]; //获取当前指针的下一个指令
                    if (item) {
                        item.redo && item.redo();
                        state.current++;
                    }
                },
            };
        },
    });
    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        excute: () => {
            return {
                redo() {
                    if (state.current === -1) {
                        //没有可以撤销的操作
                        return;
                    }
                    let item = state.queue[state.current]; //获取当前指针的指令
                    if (item) {
                        item.undo && item.undo(); //这里没有操作队列
                        state.current--;
                    }
                },
            };
        },
    });
    registry({
        name: 'drag',
        pushQueue: true,
        init() {
            //初始化
            this.before = null;
            //监控拖拽开始事件 保存状态
            const start = () => {
                // debugger;
                this.before = deepcopy(data.value.blocks);
            };
            //拖拽之后需要触发对应的指令
            const end = () => {
                // debugger;
                state.commands.drag();
            };
            events.on('start', start);
            events.on('end', end);
            return () => {
                events.off('start', start);
                events.off('end', end);
            };
        },
        excute() {
            //state.commands.drag()
            let before = this.before;
            let after = data.value.blocks;
            return {
                redo() {
                    //默认手松后的状态
                    data.value = { ...data.value, blocks: after };
                },
                undo() {
                    //前一步的状态
                    data.value = { ...data.value, blocks: before };
                },
            };
        },
    });
    //带有历史记录的常用模式
    registry({
        name: 'updateContainer',
        pushQueue: true,
        excute(newValue) {
            let state = {
                before: data.value,
                after: newValue,
            };
            return {
                redo: () => {
                    data.value = state.after;
                },
                undo: () => {
                    data.value = state.before;
                },
            };
        },
    });

    const keyboardEvent = (() => {
        const keyCodes = {
            90: 'z',
            89: 'y',
        };
        const onKeydown = (e) => {
            const { ctrlKey, keyCode } = e;
            let keyString = [];
            if (ctrlKey) {
                keyString.push('ctrl');
            }
            keyString.push(keyCodes[keyCode]);
            keyString = keyString.join('+');
            state.commandArray.forEach(({ keyboard, name }) => {
                if (!keyboard) return;
                if (keyboard === keyString) {
                    state.commands[name]();
                    e.preventDefault();
                }
            });
        };
        const init = () => {
            //初始化
            window.addEventListener('keydown', onKeydown);
            return () => {
                //销毁
                window.removeEventListener('keydown', onKeydown);
            };
        };
        return init;
    })();
    (() => {
        //监听键盘事件
        state.destroyArray.push(keyboardEvent());
        state.commandArray.forEach((command) => command.init && state.destroyArray.push(command.init()));
    })();

    onUnmounted(() => {
        //清理绑定的事件
        state.destroyArray.forEach((fn) => fn && fn());
    });
    return state;
}
