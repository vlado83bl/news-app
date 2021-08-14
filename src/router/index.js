import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NewsList from '../views/NewsList.vue';
import DeleteNewsDialog from '../components/UI/DeleteNewsDialog.vue'

// route guard
import { projectAuth } from '../firebase/config';

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user) {
    next({ name: 'Home'})
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/newslist',
    name: 'NewsList',
    component: NewsList,
    beforeEnter: requireAuth
  },
  {
    path: '/newslist/:id',
    name: 'DeleteNewsDialog',
    component: DeleteNewsDialog,
    props: true,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
