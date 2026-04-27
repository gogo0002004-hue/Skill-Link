import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Google Font - Lato
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

const app = createApp(App)
app.use(router)
app.mount('#app')