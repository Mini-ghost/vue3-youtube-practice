import { createApp } from 'vue'
import VueFinalModal from 'vue-final-modal'

import router from './router'
import store from './store'

import App from './App.vue'

import Default from '@/layouts/Default.vue'

const app = createApp(App)
app.component('Default', Default)

app
  .use(store)
  .use(router)
  .use(VueFinalModal())
  .mount('#app')

