import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://3bb2254c35e9814395556db07557856e@o4510434048212999.ingest.us.sentry.io/4510434049327104",
  environment: import.meta.env.MODE,
  // Setting this option to true will send default PII data to Sentry.
  sendDefaultPii: true,
  // For example, automatic IP address collection on events
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/playback-era\.vercel\.app\//],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.,
  // Logs
  enableLogs: true
});

app.use(createPinia())
app.use(router)

app.mount('#app')
