import Vue from 'vue'
import Router from 'vue-router'
import Rhymesaurus from '@/components/Rhymesaurus'
import Synonymasaurus from '@/components/Synonymasaurus'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rhymesaurus',
      component: Rhymesaurus
    },
    {
      path: '/synonym',
      name: 'Synonymasaurus',
      component: Synonymasaurus
    }
  ]
})
