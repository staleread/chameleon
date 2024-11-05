import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(ToastService)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none',
    },
  },
})
app.mount('#app')
