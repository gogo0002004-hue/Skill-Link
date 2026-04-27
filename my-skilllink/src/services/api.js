// src/services/api.js
import axios from 'axios'

// إعداد الاتصال الأساسي بالسيرفر
const api = axios.create({
  // ✅ الرابط المباشر للسيرفر (زي ما هو صح)
  baseURL: 'https://skilllinkapi.ddns.net',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000 // 15 ثانية
})

// إضافة التوكن (Token) مع كل طلب تلقائياً
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// التعامل مع الأخطاء (مثل انتهاء الصلاحية 401)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // التوكن منتهي - توجيه لصفحة الدخول
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // window.location.href = '/login'
      console.error('Authentication Error: Token invalid or expired')
    }
    return Promise.reject(error)
  }
)

// ==========================================
// === دوال الطالب (Student/User API) ===
// ==========================================
export const userAPI = {
  // البروفايل
  getMyProfile: () => api.get('/user/profile'),
  updateMyProfile: (data) => {
    if (data instanceof FormData) {
      return api.put('/user/profile', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      })
    }
    return api.put('/user/profile', data)
  },
  updateProfilePicture: (formData) => 
    api.put('/user/profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getPublicProfile: (userId) => api.get(`/user/profiles/${userId}`),
  
  // التحقق من الهاتف
  sendPhoneOTP: () => api.post('/user/profile/phone/send-otp'),
  verifyPhone: (data) => api.put('/user/profile/phone/verify', data),
  
  // المشاريع والوظائف
  getRecommendedJobs: () => api.get('/user/jobs'),
  getJobDetails: (jobId) => api.get(`/user/jobs/${jobId}`),
  applyForJob: (jobId, data) => api.post(`/user/jobs/${jobId}/offers`, data),
  submitCompletion: (jobId, data) => api.post(`/user/jobs/${jobId}/submit-completion`, data),
  approveCompletion: (jobId) => api.post(`/user/jobs/${jobId}/approve-completion`),
  
  // العروض والمحفوظات
  getMyOffers: () => api.get('/user/offers'),
  getSavedJobs: () => api.get('/user/saved-jobs'),
  saveJob: (jobId) => api.post(`/user/jobs/${jobId}/save`),
  unsaveJob: (jobId) => api.delete(`/user/jobs/${jobId}/save`),
  
  // التقارير
  getMyReports: () => api.get('/user/reports'),
  submitReport: (data) => {
    if (data instanceof FormData) {
      return api.post('/user/reports', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      })
    }
    return api.post('/user/reports', data)
  },
  
  // المجتمع
  getCommunityPosts: (params) => api.get('/user/community', { params }),
  createPost: (data) => api.post('/user/community/posts', data),
  likePost: (postId) => api.post(`/user/community/posts/${postId}/like`),
  commentOnPost: (postId, data) => api.post(`/user/community/posts/${postId}/comments`, data)
}

// ==========================================
// === دوال العميل (Client API) ===
// ==========================================
export const clientAPI = {
  // البروفايل
  getClientProfile: () => api.get('/client/profile'),
  updateClientProfile: (data) => {
    if (data instanceof FormData) {
      return api.put('/client/profile', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      })
    }
    return api.put('/client/profile', data)
  },
  getClients: (params) => api.get('/client/', { params }),
  
  // التحقق من الهاتف
  sendPhoneOTP: () => api.post('/client/profile/phone/send-otp'),
  verifyPhone: (data) => api.put('/client/profile/phone/verify', data),
  
  // المشاريع (Jobs)
  createJob: (data) => api.post('/client/jobs', data),
  getMyJobs: (params) => api.get('/client/jobs', { params }),
  getJobOffers: (jobId) => api.get(`/client/jobs/${jobId}/offers`),
  acceptOffer: (offerId) => api.post(`/client/offers/${offerId}/accept`),
  approveCompletion: (jobId) => api.post(`/client/jobs/${jobId}/approve-completion`),
  
  // المحفوظات (Saved Items)
  getClientSavedJobs: () => api.get('/client/saved-jobs'),
  saveJob: (jobId) => api.post(`/client/jobs/${jobId}/save`),
  unsaveJob: (jobId) => api.delete(`/client/jobs/${jobId}/save`),
  
  // المحفظة والمدفوعات
  getWallet: () => api.get('/payments/wallet'),
  topUpWallet: (data) => api.post('/payments/top-up', data),
  
  // المجتمع
  getClientCommunityPosts: (params) => api.get('/client/community', { params })
}

// ==========================================
// === دوال عامة (Common API) ===
// ==========================================
export const commonAPI = {
  // الإشعارات
  getNotifications: () => api.get('/notifications'),
  markNotificationRead: (id) => api.put(`/notifications/${id}/read`),
  
  // الشات والرسائل
  getChatRooms: () => api.get('/chats'),
  getChatMessages: (roomId) => api.get(`/chats/${roomId}/messages`),
  sendMessage: (roomId, data) => api.post(`/chats/${roomId}/messages`, data),
  
  // مهام الشات
  getChatTasks: (chatRoomId) => api.get(`/chats/${chatRoomId}/tasks`),
  createChatTask: (chatRoomId, data) => api.post(`/chats/${chatRoomId}/tasks`, data),
  updateTaskStatus: (taskId, data) => api.put(`/chats/tasks/${taskId}`, data),
  
  // المرفقات
  getAttachments: (chatRoomId) => api.get(`/chats/${chatRoomId}/attachments`),
  createAttachment: (chatRoomId, formData) => 
    api.post(`/chats/${chatRoomId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

// ==========================================
// === المصادقة (Auth API) ===
// ==========================================
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  forgetPassword: (data) => api.post('/auth/forget-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data)
}

// Export الـ API instance كـ default
export default api