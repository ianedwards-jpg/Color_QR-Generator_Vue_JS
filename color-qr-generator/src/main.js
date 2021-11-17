import Vue from 'vue'
import App from './App.vue'

// Import Bootstrap Vue 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import Color Picker for QR Generator
import {ColorPicker, ColorPanel} from 'one-colorpicker'

//Vue Use BootStrap/BootStrap Icons 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//Vue use Color Picker
Vue.use(ColorPanel)
Vue.use(ColorPicker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
