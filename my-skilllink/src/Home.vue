<template>
  <div id="app">
    
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid px-4">
        <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="goHome">
          <span class="brand-s">S</span><span class="brand-killlink">killLink</span>
        </a>
        
        <!-- Search Bar -->
        <div class="search-bar-wrapper">
          <div class="search-input-container">
            <i class="fas fa-search search-icon"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search for jobs" 
              class="search-input"
              @keyup.enter="handleSearch"
            >
          </div>
        </div>

        <!-- Right Icons -->
        <div class="nav-icons-wrapper d-flex align-items-center gap-3">
          
          <!-- ✅ تم شيل أيقونة Client Dashboard من هنا -->
          
          <!-- Community Icon -->
          <img src="/src/assets/comunity.png" alt="Community" class="nav-icon" @click="goToCommunity" title="Go to Community">
          
          <!-- Messages -->
          <div class="icon-with-badge">
            <img src="/src/assets/messages.png" alt="Chat" class="nav-icon" :class="{ active: showMessages }" @click="toggleMessages">
            <div class="badge-message" v-if="messageCount > 0">{{ messageCount }}</div>
          </div>
          
          <!-- Notifications -->
          <div class="icon-with-badge">
            <img src="/src/assets/notification.png" alt="Notifications" class="nav-icon" :class="{ active: showNotifications }" @click="toggleNotifications">
            <div class="badge-notification" v-if="notificationCount > 0">{{ notificationCount }}</div>
          </div>
          
          <!-- Profile -->
          <div class="profile-pic" @click="goToProfile">
            <img :src="userAvatar || '/src/assets/Headshot profile.jpg'" alt="Profile" class="rounded-circle">
          </div>
          
          <!-- Menu -->
          <img src="/src/assets/menu.png" alt="Menu" class="nav-icon menu-icon" :class="{ active: showMenu }" @click="toggleMenu">
        </div>
      </div>
    </nav>

    <!-- Messages Dropdown -->
    <div v-if="showMessages" class="messages-dropdown">
      <div class="message-item" v-for="msg in messagesList" :key="msg.id">
        <img :src="msg.avatar" alt="Client" class="message-avatar rounded-circle">
        <div class="message-content">
          <div class="message-header"><h6 class="message-name">{{ msg.name }}</h6><span class="message-time">{{ msg.time }}</span></div>
          <p class="message-text">{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <!-- Notifications Dropdown -->
    <div v-if="showNotifications" class="notifications-dropdown">
      <div class="notification-item" v-for="notif in notificationsList" :key="notif.id">
        <img :src="notif.avatar" alt="Client" class="notification-avatar rounded-circle">
        <div class="notification-content">
          <div class="notification-header"><h6 class="notification-name">{{ notif.name }}</h6><span class="notification-time">{{ notif.time }}</span></div>
          <p class="notification-text">{{ notif.text }}</p>
        </div>
      </div>
    </div>

    <!-- Menu Dropdown -->
    <div v-if="showMenu" class="menu-dropdown">
      <div class="menu-item" @click="goToProfile"><i class="fas fa-user"></i><span>Profile</span></div>
      <div class="menu-item" @click="goToSettings"><i class="fas fa-cog"></i><span>Settings</span></div>
      <div class="menu-item" @click="goToSaved"><i class="fas fa-bookmark"></i><span>Saved</span></div>
      <div class="menu-item" @click="goToReport"><i class="fas fa-exclamation-triangle"></i><span>Report</span></div>
      <div class="menu-item" @click="goToLogout"><i class="fas fa-sign-out-alt"></i><span>Logout</span></div>
    </div>
    
    <!-- Main Content -->
    <div class="main-container">
      <div class="container-fluid py-4 px-4">
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
        
        <!-- Error State -->
        <div v-if="error && !loading" class="error-state">
          <p>{{ error }}</p>
          <button @click="refreshData" class="btn-retry">Try Again</button>
        </div>
        
        <!-- Active Projects Section with Carousel (Only show if no error) -->
        <div class="row mb-5" v-if="!error">
          <div class="col-12">
            <h2 class="section-title mb-4">Active projects</h2>
          </div>
          
          <div class="projects-carousel" v-if="activeProjects.length > 0">
            <button class="carousel-arrow left" @click="prevSlide" v-if="currentSlide > 0">
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="carousel-track" :style="trackStyle">
              <div class="col-lg-4 col-md-6 mb-4" v-for="project in filteredActiveProjects" :key="project.id">
                <div class="project-card card h-100 border-0">
                  <div class="card-body p-4">
                    <h5 class="card-title text-center mb-2">{{ project.title }}</h5>
                    <span class="status-badge" :class="getStatusClass(project)">{{ getStatusText(project) }}</span>
                    <p class="text-center text-muted mb-3">{{ project.date }}</p>
                    <div class="progress mb-3" style="height: 6px;">
                      <div class="progress-bar-custom" :style="`width: ${getProjectProgress(project)}%`"></div>
                    </div>
                    <p class="text-center mb-3">{{ project.daysLeft }}</p>
                    <button class="btn btn-primary w-100" @click="goToProject(project.id)">Continue work</button>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="carousel-arrow right" @click="nextSlide" v-if="currentSlide < maxSlides">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <p v-else class="text-center text-muted">No active projects yet</p>
        </div>

        <!-- Recommended Jobs Section -->
        <div class="row" v-if="!error">
          <div class="col-12">
            <h2 class="section-title mb-4">Jobs recommended for you</h2>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4" v-for="job in filteredJobs" :key="job.id">
            <div class="job-card card h-100 border-0">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <img :src="job.avatar || '/src/assets/default-avatar.png'" alt="Client" class="client-avatar rounded-circle me-3">
                  <div>
                    <h6 class="client-name mb-0">{{ job.client }}</h6>
                    <div class="time-wrapper">
                      <img src="/src/assets/clock.png" alt="Clock" class="clock-icon">
                      <small class="text-muted">{{ job.time }}</small>
                    </div>
                  </div>
                </div>
                
                <h6 class="job-title mb-3">{{ job.title }}</h6>
                
                <div class="job-details mb-3">
                  <p class="mb-1"><strong>Budget:</strong> {{ job.budget }}</p>
                  <p class="mb-1"><strong>Deadline:</strong> {{ job.deadline }}</p>
                  <p class="mb-0"><strong>Category:</strong> {{ job.category }}</p>
                </div>
                
                <!-- ✅ Fixed: Apply now button goes to /apply/:id -->
                <button class="btn btn-primary w-100" @click="goToApply(`/apply/${job.id}`)">Apply now</button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div class="row mt-5" v-if="filteredJobs.length === 0 && searchQuery && !error">
          <div class="col-12">
            <div class="no-more-jobs d-flex align-items-center justify-content-center">
              <h3 class="mb-0">No jobs found matching "{{ searchQuery }}"</h3>
            </div>
          </div>
        </div>

        <!-- No More Jobs -->
        <div class="row mt-5" v-else-if="!searchQuery && recommendedJobs.length === 0 && !error">
          <div class="col-12">
            <div class="no-more-jobs d-flex align-items-center justify-content-center">
              <h3 class="mb-0">No more jobs available !</h3>
              <img src="/src/assets/girl-illustration.png" alt="Illustration" class="girl-illustration">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Robot Icon -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle">
        <img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img">
      </div>
    </div>

    <!-- Chatbot Modal -->
    <div v-if="showChatbot" class="chatbot-modal" @click.self="closeChatbot">
      <div class="chatbot-container">
        <div class="chatbot-header">
          <h3>SkillLink Chatbot</h3>
          <button class="close-chatbot" @click="closeChatbot">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="chatbot-body">
          <iframe 
            src="https://graduation-chatbot-project--toqamohsen592.replit.app" 
            frameborder="0"
            class="chatbot-iframe"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userAPI, commonAPI } from './services/api'

export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      showMenu: false,
      showMessages: false,
      showNotifications: false,
      showChatbot: false,
      currentSlide: 0,
      cardsPerSlide: 2,
      
      // API Data States
      loading: true,
      error: null,
      userAvatar: null,
      
      // Counts from API
      messageCount: 0,
      notificationCount: 0,
      
      // Lists (will be filled from API)
      messagesList: [],
      notificationsList: [],
      activeProjects: [],
      recommendedJobs: [],
      
      // Fallback data (in case API fails or for initial render)
      fallbackJobs: [
        { id: 1, client: 'Mohamed Ahmed', avatar: '/src/assets/client1.jpg', time: '2 minutes ago', title: 'UI/UX Design Needed for Platform', budget: '$80-$90', deadline: '5 days', category: 'Design & Creative' },
        { id: 2, client: 'Samy Rabea', avatar: '/src/assets/client2.jpg', time: '40 minutes ago', title: 'Can you build a website with a home page and contact page', budget: '$90-$100', deadline: '7 days', category: 'Programming & Technology' },
        { id: 3, client: 'Nada Ibrahim', avatar: '/src/assets/client3.jpg', time: '2 hours ago', title: 'Can you edit this short video and add simple transitions', budget: '$15-$25', deadline: '2 days', category: 'Audio & Video' },
        { id: 4, client: 'Mariam Mustafa', avatar: '/src/assets/client4.jpg', time: '4 hours ago', title: 'Translate this small paragraph into professional English', budget: '$5-$8', deadline: '1 day', category: 'Writing & Translation' },
        { id: 5, client: 'Ehab Mohamed', avatar: '/src/assets/client5.jpg', time: '10 hours ago', title: 'Can you write a basic service agreement for my business', budget: '$15-$20', deadline: '2 days', category: 'Legal' },
        { id: 6, client: 'Tarek Islam', avatar: '/src/assets/client6.jpg', time: '12 hours ago', title: 'I want a logo that looks modern and minimal', budget: '$30-$50', deadline: '3 days', category: 'Design & Creative' },
        { id: 7, client: 'Hekma Company', avatar: '/src/assets/client7.png', time: '14 hours ago', title: 'I need someone to handle basic customer support messages', budget: '$20-$30', deadline: '3 days', category: 'Support & Administration' },
        { id: 8, client: 'Mina Fawzy', avatar: '/src/assets/client8.jpg', time: '15 hours ago', title: 'Can you create a 3D model of this room', budget: '$50-$70', deadline: '5 days', category: 'Engineering & Architecture' },
        { id: 9, client: 'Younis Adam', avatar: '/src/assets/client9.jpg', time: '17 hours ago', title: 'I need a simple business plan for a small startup idea', budget: '$50-$70', deadline: '4 days', category: 'Business & Finance' }
      ]
    }
  },
  
  async mounted() {
    await this.loadDashboardData()
  },
  
  computed: {
    maxSlides() { return Math.max(0, this.activeProjects.length - this.cardsPerSlide); },
    trackStyle() { const offset = -this.currentSlide * (100 / 3); return { transform: `translateX(${offset}%)`, transition: 'transform 0.5s ease-in-out' }; },
    filteredActiveProjects() {
      if (!this.searchQuery) return this.activeProjects;
      const query = this.searchQuery.toLowerCase();
      return this.activeProjects.filter(project => 
        project.title?.toLowerCase().includes(query)
      );
    },
    filteredJobs() {
      if (!this.searchQuery) return this.recommendedJobs;
      const query = this.searchQuery.toLowerCase();
      return this.recommendedJobs.filter(job => 
        job.title?.toLowerCase().includes(query) ||
        job.client?.toLowerCase().includes(query) ||
        job.category?.toLowerCase().includes(query)
      );
    }
  },
  
  methods: {
    // === API Integration Methods ===
    
    async loadDashboardData() {
      try {
        this.loading = true
        this.error = null
        
        // 1. Load user profile for avatar
        try {
          const profileRes = await userAPI.getMyProfile()
          const profile = profileRes.data.data || profileRes.data
          this.userAvatar = profile.profile_picture || profile.avatar
        } catch (e) {
          console.log('Profile load skipped, using default')
        }
        
        // 2. Load notifications count
        try {
          const notifRes = await commonAPI.getNotifications()
          const notifications = notifRes.data.data || notifRes.data || []
          this.notificationCount = notifications.filter(n => !n.read).length
          this.notificationsList = notifications.slice(0, 3).map(n => ({
            id: n.id,
            name: n.from_user?.name || 'System',
            avatar: n.from_user?.avatar || '/src/assets/notification.png',
            text: n.message,
            time: this.formatTime(n.created_at)
          }))
        } catch (e) {
          this.notificationCount = 2
          this.notificationsList = [
            { id: 1, name: 'Rana Hany', avatar: '/src/assets/client3.jpg', text: 'has sent your payment', time: '1 hour ago' },
            { id: 2, name: 'Hazem Ehab', avatar: '/src/assets/client1.jpg', text: 'rated you 5 stars', time: '2 hours ago' }
          ]
        }
        
        // 3. Load messages count
        try {
          const chatsRes = await commonAPI.getChatRooms()
          const chats = chatsRes.data.data || chatsRes.data || []
          this.messageCount = chats.filter(c => c.unread_count > 0).length
          this.messagesList = chats.slice(0, 3).map(c => ({
            id: c.id,
            name: c.other_user?.name || 'User',
            avatar: c.other_user?.avatar || '/src/assets/messages.png',
            text: c.last_message,
            time: this.formatTime(c.updated_at)
          }))
        } catch (e) {
          this.messageCount = 2
          this.messagesList = [
            { id: 1, name: 'Rana Hany', avatar: '/src/assets/client3.jpg', text: 'Rana: The money will be in your wallet within minutes.', time: '1 h' },
            { id: 2, name: 'Hazem Ehab', avatar: '/src/assets/client1.jpg', text: 'Hazem: Thanks, I\'ll give you 5 stars.', time: '2 h' }
          ]
        }
        
        // 4. Load active projects (from offers endpoint)
        try {
          const offersRes = await userAPI.getMyOffers()
          const offers = offersRes.data.data || offersRes.data || []
          this.activeProjects = offers.map(offer => ({
            id: offer.id || offer.job?.id,
            title: offer.job?.title || 'Project',
            date: offer.created_at ? `From ${this.formatDate(offer.created_at)}` : '',
            daysLeft: offer.job?.deadline ? `${this.getDaysLeft(offer.job.deadline)} days left` : 'No deadline',
            tasks: offer.job?.tasks || [],
            status: offer.status
          }))
        } catch (e) {
          this.activeProjects = [
            { id: 1, title: 'Dashboard UI Design', date: 'From 12/4/25 to 12/12/25', daysLeft: '4 days left until the deadline', tasks: [{ name: 'Dashboard', completed: true }, { name: 'Recent projects menu', completed: false }, { name: 'Applying carousel', completed: false }] },
            { id: 2, title: 'Welcome Page UI Design', date: 'From 12/6/25 to 12/11/25', daysLeft: '3 days left until the deadline', tasks: [{ name: 'Design homepage', completed: true }, { name: 'Design about page', completed: true }, { name: 'Design contact page', completed: false }] },
            { id: 3, title: 'Mobile App UI Design', date: 'From 12/8/25 to 12/28/25', daysLeft: '20 days left until the deadline', tasks: [{ name: 'Login screen', completed: true }, { name: 'Home screen', completed: false }, { name: 'Profile screen', completed: false }, { name: 'Settings screen', completed: false }, { name: 'Navigation', completed: false }] }
          ]
        }
        
        // 5. Load recommended jobs ✅ FIXED: link now goes to /apply/:id
        try {
          const jobsRes = await userAPI.getRecommendedJobs()
          const jobs = jobsRes.data.data || jobsRes.data || []
          this.recommendedJobs = jobs.map(job => ({
            id: job.id,
            client: job.client?.name || 'Client',
            avatar: job.client?.avatar,
            time: this.formatTime(job.created_at),
            title: job.title,
            budget: job.budget ? `$${job.budget}` : 'Negotiable',
            deadline: job.deadline ? `${this.getDaysLeft(job.deadline)} days` : 'Flexible',
            category: job.category
            // ✅ No need for link property anymore, we build it in the template
          }))
        } catch (e) {
          // Use fallback jobs (without link property)
          this.recommendedJobs = this.fallbackJobs
        }
        
      } catch (err) {
        console.error('Dashboard load error:', err)
        this.error = 'Could not load some data. Showing fallback content.'
        this.recommendedJobs = this.fallbackJobs
      } finally {
        this.loading = false
      }
    },
    
    async refreshData() {
      this.loading = true
      await this.loadDashboardData()
    },
    
    // === Helper Methods ===
    
    formatTime(dateString) {
      if (!dateString) return 'Recently'
      const date = new Date(dateString)
      const now = new Date()
      const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
      
      if (diffHours < 1) return 'Just now'
      if (diffHours < 24) return `${diffHours}h ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    },
    
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    
    getDaysLeft(deadline) {
      if (!deadline) return 0
      const deadlineDate = new Date(deadline)
      const now = new Date()
      const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24))
      return Math.max(0, diffDays)
    },
    
    handleSearch() {
      console.log('Searching for:', this.searchQuery)
    },
    
    // === Navigation Methods ===
    
    toggleChatbot() { this.showChatbot = !this.showChatbot; },
    closeChatbot() { this.showChatbot = false; },
    
    goHome() { this.$router.push('/'); },
    // ✅ تم شيل دالة goToClientHome من صفحة الطالب
    
    goToCommunity() { this.$router.push('/community'); },
    goToProfile() { this.$router.push('/profile'); this.showMenu = false; },
    goToSettings() { this.$router.push('/settings'); this.showMenu = false; },
    goToSaved() { this.$router.push('/saved'); this.showMenu = false; },
    goToReport() { this.$router.push('/report'); this.showMenu = false; },
    goToLogout() { 
      localStorage.removeItem('token')
      alert('Logged out successfully!')
      this.$router.push('/login')
      this.showMenu = false; 
    },
    
    getStatusText(project) { 
      if (!project.tasks || project.tasks.length === 0) return 'Upcoming'; 
      const completedTasks = project.tasks.filter(task => task.completed).length; 
      const totalTasks = project.tasks.length; 
      if (completedTasks === 0) return 'Upcoming'; 
      if (completedTasks === totalTasks) return 'Completed'; 
      return 'In progress'; 
    },
    getStatusClass(project) { 
      const status = this.getStatusText(project); 
      if (status === 'Completed') return 'status-completed'; 
      if (status === 'In progress') return 'status-progress'; 
      return 'status-upcoming'; 
    },
    getProjectProgress(project) { 
      if (!project.tasks || project.tasks.length === 0) return 0; 
      const completedTasks = project.tasks.filter(task => task.completed).length; 
      return Math.round((completedTasks / project.tasks.length) * 100); 
    },
    goToProject(projectId) { this.$router.push('/project/' + projectId); },
    
    // ✅ FIXED: Apply now goes to /apply/:id
    goToApply(path) { 
      if (path) { 
        this.$router.push(path); 
      } else { 
        alert('Apply page coming soon for this job!'); 
      } 
    },
    
    nextSlide() { if (this.currentSlide < this.maxSlides) { this.currentSlide++; } },
    prevSlide() { if (this.currentSlide > 0) { this.currentSlide--; } },
    
    toggleMenu() { this.showMenu = !this.showMenu; this.showMessages = false; this.showNotifications = false; },
    toggleMessages() { this.showMessages = !this.showMessages; this.showNotifications = false; this.showMenu = false; },
    toggleNotifications() { this.showNotifications = !this.showNotifications; this.showMessages = false; this.showMenu = false; }
  }
}
</script>

<style>
/* ✅ كل الـ CSS بتاعك زي ما هو - لم أغير أي سطر */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
* { font-family: 'Lato', sans-serif; }
body { background-color: #F5F5F5; margin: 0; padding: 0; }

/* Navbar Styles */
.navbar {
  background-color: #FFFFFF !important;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand-s {
  font-family: 'Dancing Script', cursive;
  color: #0C9892;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  margin-right: 2px;
  cursor: pointer;
}

.brand-killlink {
  color: #000000;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}

/* Search Bar */
.search-bar-wrapper {
  flex: 1;
  max-width: 600px;
  margin: 0 30px;
}

.search-input-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #0C9892;
  font-size: 18px;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 50px;
  border: 2px solid #0C9892;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  background-color: #FFFFFF;
}

.search-input:focus {
  border-color: #0C9892;
  box-shadow: 0 0 0 4px rgba(12, 152, 146, 0.1);
}

.search-input::placeholder {
  color: #0C9892;
}

/* Icons */
.nav-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.8;
}

.nav-icon:hover {
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%);
}

.nav-icon.active {
  filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%);
  opacity: 1;
}

.menu-icon {
  width: 34px;
  height: 34px;
}

.profile-pic {
  cursor: pointer;
}

.profile-pic img {
  width: 42px;
  height: 42px;
  object-fit: cover;
  border: 2px solid #0C9892;
}

.icon-with-badge {
  position: relative;
  display: inline-block;
}

.badge-message, .badge-notification {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #E63946;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
}

/* Dropdowns */
.messages-dropdown, .notifications-dropdown, .menu-dropdown {
  position: absolute;
  top: 75px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border: 2px solid #E0E0E0;
  min-width: 420px;
  max-width: 450px;
  z-index: 1000;
  padding: 20px;
}

.messages-dropdown { right: 150px; }
.notifications-dropdown { right: 90px; }
.menu-dropdown { right: 20px; min-width: 200px; }

.message-item, .notification-item, .menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 10px;
}

.message-item:hover, .notification-item:hover, .menu-item:hover {
  background-color: #F5F5F5;
}

.message-item:last-child, .notification-item:last-child, .menu-item:last-child {
  margin-bottom: 0;
}

.message-avatar, .notification-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-content, .notification-content {
  flex: 1;
  min-width: 0;
}

.message-header, .notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.message-name, .notification-name {
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.message-time, .notification-time {
  font-size: 14px;
  color: #0C9892;
  font-weight: 600;
}

.message-text, .notification-text {
  font-size: 15px;
  color: #666;
  margin: 0;
}

.menu-item {
  font-size: 16px;
  color: #000000;
  font-weight: 600;
}

.menu-item i {
  color: #000000;
  width: 20px;
  font-size: 18px;
}

/* Main Content */
.main-container { padding-right: 100px; }
.section-title { font-size: 32px; font-weight: 700; color: #000000; }

/* Loading & Error States */
.loading-state, .error-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}
.error-state { color: #dc3545; }
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0C9892;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.btn-retry {
  background: #0C9892; color: white; border: none;
  padding: 10px 25px; border-radius: 25px;
  cursor: pointer; margin-top: 15px;
}

/* Carousel */
.projects-carousel { position: relative; display: flex; align-items: center; overflow: hidden; padding: 0 50px; }
.carousel-track { display: flex; width: 100%; }
.carousel-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; background-color: #0C9892; border: none; color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); z-index: 10; }
.carousel-arrow:hover { background-color: #0a827d; transform: translateY(-50%) scale(1.1); box-shadow: 4px 4px 8px rgba(0,0,0,0.2); }
.carousel-arrow.left { left: 0; }
.carousel-arrow.right { right: 0; }

/* Cards */
.project-card, .job-card { border-radius: 30px; transition: transform 0.2s; background-color: #FFFFFF; border: 1px solid #e0e0e0; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); padding: 24px; min-width: calc(33.333% - 20px); margin: 0 10px; }
.project-card:hover, .job-card:hover { transform: translateY(-2px); box-shadow: 4px 4px 8px rgba(0,0,0,0.2); }
.card-title { font-size: 24px; font-weight: 700; }

/* Status Badge */
.status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 15px; text-align: center; width: 100%; }
.status-upcoming { background-color: #FFF3CD; color: #856404; }
.status-progress { background-color: #E0F2F1; color: #0C9892; }
.status-completed { background-color: #D4EDDA; color: #155724; }

/* Progress Bar */
.progress { background-color: #F5F5F5; border-radius: 30px; overflow: hidden; }
.progress-bar-custom { height: 100%; background-color: #0C9892; border-radius: 30px; }

/* Buttons */
.btn-primary { background-color: #0C9892 !important; border-color: #0C9892 !important; border-radius: 30px; padding: 14px 24px; font-weight: 600; font-size: 18px; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); }
.btn-primary:hover { background-color: #0a827d !important; border-color: #0a827d !important; }

/* Job Card Details */
.client-name { font-size: 22px; font-weight: 700; color: #000000; }
.job-title { font-size: 20px; font-weight: 600; color: #000000; line-height: 1.4; }
.job-details p { font-size: 17px; color: #666; margin-bottom: 6px; }
.client-avatar { width: 42px; height: 42px; object-fit: cover; }
.time-wrapper { display: flex; align-items: center; gap: 6px; }
.clock-icon { width: 14px; height: 14px; object-fit: contain; opacity: 0.7; }

/* No More Jobs */
.no-more-jobs { background-color: #E0E0E0; border-radius: 30px; padding: 30px 40px; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); }
.girl-illustration { width: 250px; height: 250px; margin-left: 30px; object-fit: contain; }
.no-more-jobs h3 { color: #000000; font-weight: 900; font-size: 44px; }
.job-card { display: flex; flex-direction: column; height: 100%; }
.job-card .card-body { display: flex; flex-direction: column; flex: 1; }
.job-card .job-details { flex: 1; }
.job-card .btn-primary { margin-top: auto; align-self: stretch; }

/* Robot Icon */
.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }

/* Chatbot Modal Styles */
.chatbot-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.chatbot-container {
  background-color: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  height: 80vh;
  max-height: 700px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.chatbot-header {
  background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.close-chatbot {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-chatbot:hover {
  background-color: rgba(255,255,255,0.2);
  transform: rotate(90deg);
}

.chatbot-body {
  flex: 1;
  overflow: hidden;
}

.chatbot-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Responsive */
@media (max-width: 768px) { 
  .robot-wrapper { display: none; } 
  .main-container { padding-right: 0; } 
  .no-more-jobs { flex-direction: column; text-align: center; } 
  .girl-illustration { margin-left: 0; margin-top: 20px; } 
  .projects-carousel { padding: 0 40px; } 
  .carousel-arrow { width: 40px; height: 40px; font-size: 16px; } 
  .search-bar-wrapper { max-width: 100%; margin: 15px 0; order: 3; }
  .navbar { flex-wrap: wrap; }
  .chatbot-container {
    width: 95%;
    height: 90vh;
  }
}
</style>