export default defineComponent({
    props: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        },
    },
    emit: ['update:start', 'update:end'],
    setup(props, ctx) {
        const start = computed({
            get() {
                return props.start;
            },
            set(newValue) {
                ctx.emit('update:start', newValue);
            },
        });
        const end = computed({
            get() {
                return props.end;
            },
            set(newValue) {
                ctx.emit('update:end', newValue);
            },
        });

        return () => {
            return (
                <div class="range">
                    <input v-model={start.value}></input>
                    <span>~</span>
                    <input v-model={end.value}></input>
                </div>
            );
        };
    },
});
