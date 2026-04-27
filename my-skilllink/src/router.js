import { createRouter, createWebHistory } from 'vue-router'

// 🔹 Student Pages
import Home from './Home.vue'
import Community from './Community.vue'
import Profile from './components/Profile.vue'
import Settings from './components/Settings.vue'
import Saved from './components/Saved.vue'
import Report from './components/Report.vue'
import ProjectDetails from './components/ProjectDetails.vue'
import ApplyProject from './components/ApplyProject.vue'

// 🔹 Client Pages
import ClientHome from './components/ClientHome.vue'
import ClientProfile from './components/ClientProfile.vue'
import ClientSettings from './components/ClientSettings.vue'
import ClientSaved from './components/ClientSaved.vue'
import ClientReport from './components/ClientReport.vue'
import ClientCommunity from './components/ClientCommunity.vue'
import Payment from './components/Payment.vue'
import FreelancerProfile from './components/FreelancerProfile.vue'

const routes = [
  // ✅ أول صفحة تظهر هي صفحة الطالب (الرئيسية)
  { path: '/', name: 'StudentHome', component: Home },
  
  // 🔹 Student Dashboard & Pages
  { path: '/student-home', name: 'StudentHomeRedirect', redirect: '/' },
  { path: '/community', name: 'Community', component: Community },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/saved', name: 'Saved', component: Saved },
  { path: '/report', name: 'Report', component: Report },
  
  // ✅ ضفنا :id عشان المسار يشتغل صح
  { path: '/project/:id', name: 'ProjectDetails', component: ProjectDetails, props: true },
  { path: '/apply/:id', name: 'ApplyProject', component: ApplyProject, props: true },
  
  // 🔹 Client Dashboard & Pages
  { path: '/client-home', name: 'ClientHome', component: ClientHome },
  { path: '/client-profile', name: 'ClientProfile', component: ClientProfile },
  { path: '/client-settings', name: 'ClientSettings', component: ClientSettings },
  { path: '/client-saved', name: 'ClientSaved', component: ClientSaved },
  { path: '/client-report', name: 'ClientReport', component: ClientReport },
  { path: '/client-community', name: 'ClientCommunity', component: ClientCommunity },
  { path: '/payment', name: 'Payment', component: Payment },
  
  // ✅ ضفنا :slug عشان مسار الفريلانسر يشتغل صح
  { path: '/freelancer/:slug', name: 'FreelancerProfile', component: FreelancerProfile, props: true },
  
  // ✅ أي مسار غلط يرجعك للرئيسية
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

// ✅ تم تعديل الحماية: يسمح بالدخول من غير توكن (مؤقتاً عشان تكملِي الشغل)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userType = user.user_type || user.role
  
  // الصفحات العامة (كل الصفحات دلوقتي عامة لحد ما نرجع اللوجين)
  const publicPages = ['/', '/student-home', '/client-home', '/profile', '/settings', '/saved', '/report', '/community', '/project', '/apply', '/client-profile', '/client-settings', '/client-saved', '/client-report', '/client-community', '/payment', '/freelancer']
  
  const studentPages = ['StudentHome', 'Profile', 'Saved', 'Report', 'Community', 'Settings', 'ProjectDetails', 'ApplyProject', 'FreelancerProfile']
  const clientPages = ['ClientHome', 'ClientProfile', 'ClientSaved', 'ClientReport', 'ClientCommunity', 'ClientSettings', 'Payment']
  
  // ✅ لو مفيش توكن، اسمحي بالدخول عادي (مؤقتاً)
  if (!token) {
    next()
    return
  }
  
  // التحقق من نوع المستخدم (لو التوكن موجود)
  if (studentPages.includes(to.name) && userType !== 'student') {
    next({ name: 'ClientHome' })
    return
  }
  
  if (clientPages.includes(to.name) && userType !== 'client') {
    next({ name: 'StudentHome' })
    return
  }
  
  next()
})

export default router