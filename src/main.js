import '@shoelace-style/shoelace/dist/themes/light.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'

import './css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/')
