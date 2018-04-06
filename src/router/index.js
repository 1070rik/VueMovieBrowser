import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import movieResult from '@/components/movieResult'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie/:name',
      name: 'movie-result',
      component: movieResult
    }
  ]
})
