import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/ErrorPage'
import Explore from '@/components/Explore'
import AddPicture from '@/components/AddPicture'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/add',
      name: 'Add',
      component: AddPicture
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/*',
      name: 'Error',
      component: ErrorPage
    }
  ]
})
