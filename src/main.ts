import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: 'https://3bb2254c35e9814395556db07557856e@o4510434048212999.ingest.us.sentry.io/4510434049327104',
  enableLogs: true,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
