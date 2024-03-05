export function useMenuDragger(containerRef, data) {
  let currentComponent = null;
  const dragenter = (e) => {
    e.dataTransfer.dropEffect = 'move'; //拖动图标
  };
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragleave = (e) => {
    e.dataTransfer.dropEffect = 'none';
  };
  const drop = (e) => {
    let blocks = data.value.blocks || []; //获取当前已经渲染的组件
    data.value = {
      ...data.value,
      blocks: [
        ...blocks,
        {
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          key: currentComponent.key,
          alignCenter: true, //松手后居中
        },
      ],
    };
    currentComponent = null;
  };
  const dragstart = (e, component) => {
    //dragenter 进入元素中 添加一个移动的标识
    //dragover 在元素中移动 必须阻止默认事件 否则不会触发drop事件
    //dragleave 离开元素 需要禁用标识
    //drop 松手 根据拖拽的组件 添加一个组件
    containerRef.value.addEventListener('dragenter', dragenter);
    containerRef.value.addEventListener('dragover', dragover);
    containerRef.value.addEventListener('dragleave', dragleave);
    containerRef.value.addEventListener('drop', drop);
    currentComponent = component;
  };
  const dragend = () => {
    containerRef.value.removeEventListener('dragenter', dragenter);
    containerRef.value.removeEventListener('dragover', dragover);
    containerRef.value.removeEventListener('dragleave', dragleave);
    containerRef.value.removeEventListener('drop', drop);
  };
  return {
    dragstart,
    dragend,
  };
}
