import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store  from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('../views/Review.vue')
  },
  {
    path: '/',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if(to.path=='/'){
    store.state.userinfo={
      firstname: "",
      lastname: "",
      email: "",
      password: undefined,
      mobile: undefined,
      age: undefined,
      address: "India",
      profilepic: ""
    },
    store.state.cartItems=[];
    store.state.userPresent=false
  }
  if(to.path=='/login'){
    store.state.userName="",
    store.state.password="",
    store.state.userPresent=false,
    store.state.cartItems=[]
  }
  const publicPages = ['/login', '/'];
  const authRequired = publicPages.includes(to.path);
  const loggedIn =store.state.userPresent;
  // window.alert(authRequired+" jhgfdx "+loggedIn);
  if (!authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
