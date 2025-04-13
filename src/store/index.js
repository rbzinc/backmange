import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
export * from './modules/user.js'
export * from './modules/setting.js'


const pinia = createPinia()
pinia.use(persist)
export default pinia