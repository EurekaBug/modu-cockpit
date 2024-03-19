import { events } from './events';

export function useBlockDragger(focusData, lastSelectBlock, data) {
    let dragState = {
        startX: 0,
        startY: 0,
        dragging: false, //是否正在拖拽
    };
    let markLine = reactive({
        x: null,
        y: null,
    });
    const mousemove = (e) => {
        let { clientX: moveX, clientY: moveY } = e;

        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start'); //触发事件就会记住拖拽前的位置
        }

        //计算当前元素最新的left和top,找到显示线
        //鼠标移动后的位置减去鼠标移动前的位置+left/top
        let left = dragState.startLeft + moveX - dragState.startX;
        let top = dragState.startTop + moveY - dragState.startY;

        //计算横线 距离5px时显示
        let y = null;
        for (let i = 0; i < dragState.lines.y.length; i++) {
            const { top: t, showTop: s } = dragState.lines.y[i]; //每一条线
            if (Math.abs(t - top) < 5) {
                y = s;
                //实现自动吸附 =容器顶部的距离+目标的高度
                moveY = dragState.startY - dragState.startTop + t;
                break; //找到第一根线就停止
            }
        }
        //计算竖线 距离5px时显示
        let x = null;
        for (let i = 0; i < dragState.lines.x.length; i++) {
            const { left: l, showLeft: s } = dragState.lines.x[i]; //每一条线
            if (Math.abs(l - left) < 5) {
                x = s;
                //实现自动吸附 =容器左边的距离+目标的宽度
                moveX = dragState.startX - dragState.startLeft + l;
                break; //找到第一根线就停止
            }
        }

        //响应式数据更新
        markLine.x = x;
        markLine.y = y;

        let durX = moveX - dragState.startX; //之前和之后的差值
        let durY = moveY - dragState.startY;
        focusData.value.focus.forEach((block, index) => {
            block.top = dragState.startPos[index].top + durY;
            block.left = dragState.startPos[index].left + durX;
        });
    };
    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);

        //拖拽结束后清空线
        markLine.x = null;
        markLine.y = null;

        if (dragState.dragging) {
            events.emit('end'); //触发事件就会记住拖拽后的位置
        }
    };
    const mousedown = (e) => {
        const { width: BWidth, height: BHeight } = lastSelectBlock.value;
        console.log(lastSelectBlock.value);
        dragState = {
            startX: e.clientX,
            startY: e.clientY,
            startPos: focusData.value.focus.map(({ top, left }) => ({ top, left })),
            startLeft: lastSelectBlock.value.left, //b拖拽前的left
            startTop: lastSelectBlock.value.top, //b拖拽前的top
            dragging: false,
            lines: (() => {
                const { unFocus } = focusData.value; //获取未选中的组件
                console.log(unFocus);
                let lines = { x: [], y: [] }; //初始化线的位置 y是水平线 x是垂直线
                [
                    ...unFocus,
                    {
                        top: 0,
                        left: 0,
                        width: data.value.container.width,
                        height: data.value.container.height,
                    },
                ].forEach((block) => {
                    const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block;
                    //1.顶对顶辅助线
                    lines.y.push({ showTop: ATop, top: ATop });
                    //2.顶对底辅助线
                    lines.y.push({ showTop: ATop, top: ATop - BHeight });
                    //3.中对中辅助线
                    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 });
                    //4.底对顶辅助线
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight });
                    //5.底对底辅助线
                    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight });

                    //1.左对左辅助线
                    lines.x.push({ showLeft: ALeft, left: ALeft });
                    //2.左对右辅助线
                    lines.x.push({ showLeft: ALeft, left: ALeft - BWidth });
                    //3.中对中辅助线
                    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 });
                    //4.右对左辅助线
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth });
                    //5.右对右辅助线
                    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth });
                });
                console.log(lines);
                return lines;
            })(),
        };
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    };
    return {
        mousedown,
        markLine,
    };
}
