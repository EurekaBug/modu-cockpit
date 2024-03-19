// 全部小写，且加上 el-icon-，如：el-icon-xxx。这样更清晰
export const toIconLine = (value) => {
    return 'el-icon-' + value.replace(/(A-Z)/g, '-$1').toLocaleLowerCase();
};
