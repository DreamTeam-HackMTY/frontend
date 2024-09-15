import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
//import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);

app.use(router);
app.mount('#app');
