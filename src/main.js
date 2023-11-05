import { createApp } from 'vue';
import App from './App.vue';

//自定义样式
import '@/styles/index.scss';

//引入路由
import router from '@/router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
