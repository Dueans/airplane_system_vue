import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ELIcons from '@element-plus/icons-vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
// for (let iconName in ELIcons) {
//   app.component(iconName, ELIcons[iconName])
// }
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
