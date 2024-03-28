import { start } from 'nprogress';

export default defineComponent({
    props: {
        block: { type: Object },
        component: { type: Object },
    },
    setup(props) {
        const { width, height } = props.component.resize || {};
        let data = {};
        const onmousemove = (e) => {
            let { clientX, clientY } = e;
            let { startX, startY, startWidth, startHeight, startLeft, startTop, direction } = data;
            if (direction.horizontal == 'center') {
                clientX = startX;
            }
            if (direction.vertical == 'center') {
                clientY = startY;
            }
            let durX = clientX - startX;
            let durY = clientY - startY;
            if (direction.vertical == 'start') {
                //针对反方向的情况
                durY = -durY;
                props.block.top = startTop - durY;
            }
            if (direction.horizontal == 'start') {
                durX = -durX;
                props.block.left = startLeft - durX;
            }
            const width = startWidth + durX;
            const height = startHeight + durY;

            props.block.width = width;
            props.block.height = height; //修改宽高
            props.block.hasResize = true;
        };
        const onmouseup = () => {
            document.removeEventListener('mousemove', onmousemove);
            document.removeEventListener('mouseup', onmouseup);
        };
        const onmousedown = (e, direction) => {
            e.stopPropagation();
            data = {
                startX: e.clientX,
                startY: e.clientY,
                startWidth: props.block.width,
                startHeight: props.block.height,
                startLeft: props.block.left,
                startTop: props.block.top,
                direction,
            };
            document.addEventListener('mousemove', onmousemove);
            document.addEventListener('mouseup', onmouseup);
        };
        return () => (
            <>
                {width && (
                    <>
                        <div class="block-resize block-resize-left" onMousedown={(e) => onmousedown(e, { horizontal: 'start', vertical: 'center' })}></div>
                        <div class="block-resize block-resize-right" onMousedown={(e) => onmousedown(e, { horizontal: 'end', vertical: 'center' })}></div>
                    </>
                )}
                {height && (
                    <>
                        <div class="block-resize block-resize-top" onMousedown={(e) => onmousedown(e, { horizontal: 'center', vertical: 'start' })}></div>
                        <div class="block-resize block-resize-bottom" onMousedown={(e) => onmousedown(e, { horizontal: 'center', vertical: 'end' })}></div>
                    </>
                )}
                {width && height && (
                    <>
                        <div class="block-resize block-resize-top-left" onMousedown={(e) => onmousedown(e, { horizontal: 'start', vertical: 'start' })}></div>
                        <div class="block-resize block-resize-top-right" onMousedown={(e) => onmousedown(e, { horizontal: 'end', vertical: 'start' })}></div>
                        <div class="block-resize block-resize-bottom-left" onMousedown={(e) => onmousedown(e, { horizontal: 'start', vertical: 'end' })}></div>
                        <div class="block-resize block-resize-bottom-right" onMousedown={(e) => onmousedown(e, { horizontal: 'end', vertical: 'end' })}></div>
                    </>
                )}
            </>
        );
    },
});
