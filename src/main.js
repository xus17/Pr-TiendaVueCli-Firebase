import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'


Vue.use(firestorePlugin)
Vue.use(VueRouter)
Vue.use(Notifications)

import Home from './components/Home.vue'
import Login from './Vistas/Login.vue'
import Registrar from './Vistas/Registrar.vue'
import Carrito from './Vistas/Carrito.vue'
import Admin from './Vistas/Admin.vue'

Vue.component(Home)
Vue.component(Login)
Vue.component(Registrar)
Vue.component(Carrito)
Vue.component(Admin)

const routes = [
  {
    path: '/',
    name: 'home',
    component : Home  
  }  ,
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: Registrar
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: Carrito
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

