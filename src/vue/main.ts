import { createApp } from 'vue';
import App from '@/vue/App.vue';
import { SpatialNavigation } from '@/SpatialNavigation';

const app = createApp(App);

SpatialNavigation.init({ debug: false, visualDebug: false })

app.mount('#root');
