import { createApp } from 'vue';
import App from './App.vue';

//自定义样式
import '@/styles/index.scss';

//引入路由
import router from '@/router/index';

//混入 -- 抽取公用的实例（操作成功与失败消息提醒内容等）
import mixin from '@/utils/mixin';

//引入全局过滤器
import { filters } from '@/utils/filters';

//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

//引入element-plus的图标
// import { toIconLine } from './utils/elements';

const app = createApp(App);
app.config.globalProperties.$filters = filters;
// 注册所有图标
app.use(ElementPlus);
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 全局注册图标 会牺牲一点性能 el-icon-xxx
// for (let i in ElementPlusIconsVue) {
//     let name = toIconLine(i);
//     console.log(name);
//     app.component(name, ElementPlusIconsVue[i]);
// }

app.use(router);
app.mixin(mixin);

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
import { createPersistedState } from 'pinia-plugin-persistedstate';
pinia.use(
    createPersistedState({
        auto: true, // 启用所有 Store 默认持久化
    }),
);
// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    };
});
app.use(pinia);

import 'element-plus/theme-chalk/dark/css-vars.css';

// store
import store from '@/store';
app.config.globalProperties.$store = store;

// 配置全局api
import api from '@/api';
app.config.globalProperties.$api = api;

// 全局组件注册
import myComponent from '@/components/index';
Object.keys(myComponent).forEach((key) => {
    app.component(key, myComponent[key]);
});

//路由权限
// import '@/router/permission.js';

// 注册自定义指令（eg:按钮权限）
import directive from '@/directive/index.js';
Object.keys(directive).forEach((key) => {
    app.directive(key, directive[key]);
});

app.mount('#app');
