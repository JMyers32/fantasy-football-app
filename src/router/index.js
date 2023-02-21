import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import store from '../store/index'
import CurrentTeams from '../views/CurrentTeams.vue'
import ProfileView from '../views/ProfileView.vue'
import messageView from '../views/MessageView.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home-View',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login-view",
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout-view",
      component: LogoutView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register-view",
      component: RegisterView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path:'/currentTeams',
      name:'current-teams',
      component: CurrentTeams,
      meta: {
        requiresAuth: true
      }
    },
   
    {
      path:'/profile',
      name:'profile-view',
      component:ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/messages',
      name:'message-view',
      component:messageView,
      meta: {
        requiresAuth: true
      }
    },
   
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    store.commit('ORIGINAL_DESTINATION',to.fullPath)
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
