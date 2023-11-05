import { createApp } from 'vue';
import App from './App.vue';

//自定义样式
import '@/styles/index.scss';

//引入路由
import router from '@/router/index';

//混入 -- 抽取公用的实例（操作成功与失败消息提醒内容等）
import mixin from '@/utils/mixin';

const app = createApp(App);
app.use(router);
app.mixin(mixin);
app.mount('#app');
