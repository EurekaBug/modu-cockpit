export function useFocus(data, callback) {
    //获取那些元素被选中
    const focusData = computed(() => {
        let focus = [];
        let unFocus = [];
        (data.value.blocks || []).forEach((block) => {
            (block.focus ? focus : unFocus).push(block);
        });
        return { focus, unFocus };
    });
    const clearBlockFocus = () => {
        data.value.blocks.forEach((block) => {
            block.focus = false;
        });
    };
    const containerMousedown = () => {
        clearBlockFocus(); //点击空白处清空所有的block的焦点
    };
    const blockMousedown = (e, block) => {
        //block上的focus属性在获取焦点后设置为true
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
            block.focus = !block.focus;
        } else {
            if (!block.focus) {
                clearBlockFocus(); //清空所有的block的焦点
                block.focus = true;
            } else {
                block.focus = false;
            }
        }
        callback(e);
    };

    return {
        blockMousedown,
        focusData,
        containerMousedown,
    };
}
