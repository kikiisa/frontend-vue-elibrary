import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cookies from 'js-cookie'
import axios from 'axios'
import { url } from '../api/Url'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registrasi',
      name: 'registrasi',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/account/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },

  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkIfAuthenticated() // Fungsi untuk memeriksa apakah pengguna sudah terautentikasi

  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
          // Jika tidak terautentikasi, redirect ke halaman login
          next('/login')
      } else {
          // Jika terautentikasi, lanjutkan ke rute yang dituju
          next()
      }
  } else {
      // Rute tidak memerlukan autentikasi, lanjutkan
      next()
  }
})
function checkIfAuthenticated() {
  // Lakukan pemeriksaan autentikasi di sini, misalnya dengan memeriksa apakah token ada atau masih valid
  // Anda dapat menggunakan cookie atau localStorage untuk menyimpan token dan memeriksanya di sini
  const token = Cookies.get('token') // Ambil token dari cookie  
  return !!token // Mengembalikan nilai boolean berdasarkan apakah token ada atau tidak
}
export default router
