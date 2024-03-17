export function useFocus(data, callback) {
    const selectIndex = ref(-1); //选中的元素的索引
    const lastSelectBlock = computed(() => data.value.blocks[selectIndex.value]); //最后一次选中的元素

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
        selectIndex.value = -1;
    };
    const blockMousedown = (e, block, index) => {
        //block上的focus属性在获取焦点后设置为true
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
            if (focusData.value.focus.length <= 1) {
                block.focus = true; //如果只有一个元素被选中，按住shift键再次点击时，不会触发多选
            } else {
                block.focus = !block.focus;
            }
        } else {
            if (!block.focus) {
                clearBlockFocus(); //清空所有的block的焦点
                block.focus = true;
            }
            //当已经被选中的block再次被点击时，不再触发回调函数
        }
        selectIndex.value = index;
        callback(e); //拖拽
    };

    return {
        blockMousedown,
        focusData,
        containerMousedown,
        lastSelectBlock,
    };
}
