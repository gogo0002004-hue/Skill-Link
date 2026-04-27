<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid px-4">
      <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="goBack">
        <span class="brand-s">S</span><span class="brand-killlink">killLink</span>
      </a>
      <div class="nav-icons-wrapper d-flex align-items-center gap-3">
        <img src="/src/assets/comunity.png" alt="Users" class="nav-icon" @click="goToCommunity">
        <div class="icon-with-badge">
          <img src="/src/assets/messages.png" alt="Chat" class="nav-icon" :class="{ active: showMessages }" @click="toggleMessages">
          <div class="badge-message" v-if="messageCount > 0">{{ messageCount }}</div>
        </div>
        <div class="icon-with-badge">
          <img src="/src/assets/notification.png" alt="Notifications" class="nav-icon" :class="{ active: showNotifications }" @click="toggleNotifications">
          <div class="badge-notification" v-if="notificationCount > 0">{{ notificationCount }}</div>
        </div>
        <div class="profile-pic" @click="goToProfile">
          <img src="/src/assets/Headshot profile.jpg" alt="Profile" class="rounded-circle">
        </div>
        <img src="/src/assets/menu.png" alt="Menu" class="nav-icon menu-icon" :class="{ active: showMenu }" @click="toggleMenu">
      </div>
    </div>
  </nav>
  <div v-if="showMessages" class="messages-dropdown">
    <div class="message-item" v-for="msg in messagesList" :key="msg.id">
      <img :src="msg.avatar" alt="Client" class="message-avatar rounded-circle">
      <div class="message-content">
        <div class="message-header"><h6 class="message-name">{{ msg.name }}</h6><span class="message-time">{{ msg.time }}</span></div>
        <p class="message-text">{{ msg.text }}</p>
      </div>
    </div>
  </div>
  <div v-if="showNotifications" class="notifications-dropdown">
    <div class="notification-item" v-for="notif in notificationsList" :key="notif.id">
      <img :src="notif.avatar" alt="Client" class="notification-avatar rounded-circle">
      <div class="notification-content">
        <div class="notification-header"><h6 class="notification-name">{{ notif.name }}</h6><span class="notification-time">{{ notif.time }}</span></div>
        <p class="notification-text">{{ notif.text }}</p>
      </div>
    </div>
  </div>
  <div v-if="showMenu" class="menu-dropdown">
    <div class="menu-item" @click="goToProfile"><i class="fas fa-user"></i><span>Profile</span></div>
    <div class="menu-item" @click="goToSettings"><i class="fas fa-cog"></i><span>Settings</span></div>
    <div class="menu-item" @click="goToSaved"><i class="fas fa-bookmark"></i><span>Saved</span></div>
    <div class="menu-item" @click="goToReport"><i class="fas fa-exclamation-triangle"></i><span>Report</span></div>
    <div class="menu-item" @click="goToLogout"><i class="fas fa-sign-out-alt"></i><span>Logout</span></div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false, showMessages: false, showNotifications: false,
      messageCount: 2, notificationCount: 2,
      messagesList: [
        { id: 1, name: 'Rana Hany', avatar: '/src/assets/client3.jpg', text: 'Rana: The money will be in your wallet within minutes.', time: '1 h' },
        { id: 2, name: 'Hazem Ehab', avatar: '/src/assets/client1.jpg', text: 'Hazem: Thanks, I\'ll give you 5 stars.', time: '2 h' },
        { id: 3, name: 'Ahmed Khairy', avatar: '/src/assets/client6.jpg', text: 'You: I can finish this task in less time than requested.', time: '4 h' }
      ],
      notificationsList: [
        { id: 1, name: 'Rana Hany', avatar: '/src/assets/client3.jpg', text: 'has sent your payment', time: '1 hour ago' },
        { id: 2, name: 'Hazem Ehab', avatar: '/src/assets/client1.jpg', text: 'rated you 5 stars', time: '2 hours ago' },
        { id: 3, name: 'Rana Hany', avatar: '/src/assets/client3.jpg', text: 'approved your offer', time: '2 days ago' }
      ]
    }
  },
  methods: {
    goBack() { this.$router.push('/'); },
    goToCommunity() { this.$router.push('/community'); },
    goToProfile() { this.$router.push('/profile'); this.showMenu = false; },
    goToSettings() { this.$router.push('/settings'); this.showMenu = false; },
    goToSaved() { this.$router.push('/saved'); this.showMenu = false; },
    goToReport() { this.$router.push('/report'); this.showMenu = false; },
    goToLogout() { alert('Logout coming soon!'); this.showMenu = false; },
    toggleMenu() { this.showMenu = !this.showMenu; this.showMessages = false; this.showNotifications = false; },
    toggleMessages() { this.showMessages = !this.showMessages; this.showNotifications = false; this.showMenu = false; },
    toggleNotifications() { this.showNotifications = !this.showNotifications; this.showMessages = false; this.showMenu = false; }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.brand-s { font-family: 'Dancing Script', cursive; color: #0C9892; font-size: 48px; font-weight: 700; line-height: 1; margin-right: 2px; cursor: pointer; }
.brand-killlink { color: #000000; font-size: 26px; font-weight: 700; line-height: 1; }
.nav-icon { width: 32px; height: 32px; cursor: pointer; transition: all 0.3s; opacity: 0.8; }
.nav-icon:hover { opacity: 1; filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%); }
.nav-icon.active { filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%); opacity: 1; }
.menu-icon { width: 34px; height: 34px; }
.profile-pic { cursor: pointer; }
.profile-pic img { width: 42px; height: 42px; object-fit: cover; border: 2px solid #0C9892; }
.icon-with-badge { position: relative; display: inline-block; }
.badge-message, .badge-notification { position: absolute; top: -8px; right: -8px; background-color: #E63946; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; z-index: 10; }
.messages-dropdown, .notifications-dropdown, .menu-dropdown { position: absolute; top: 75px; background-color: white; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border: 2px solid #E0E0E0; min-width: 420px; max-width: 450px; z-index: 1000; padding: 20px; }
.messages-dropdown { right: 150px; }
.notifications-dropdown { right: 90px; }
.menu-dropdown { right: 20px; min-width: 200px; }
.message-item, .notification-item, .menu-item { display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 15px; cursor: pointer; transition: background-color 0.2s; margin-bottom: 10px; }
.message-item:hover, .notification-item:hover, .menu-item:hover { background-color: #F5F5F5; }
.message-item:last-child, .notification-item:last-child, .menu-item:last-child { margin-bottom: 0; }
.message-avatar, .notification-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.message-content, .notification-content { flex: 1; min-width: 0; }
.message-header, .notification-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
.message-name, .notification-name { font-size: 18px; font-weight: 700; color: #000000; margin: 0; }
.message-time, .notification-time { font-size: 14px; color: #0C9892; font-weight: 600; }
.message-text, .notification-text { font-size: 15px; color: #666; margin: 0; }
.menu-item { font-size: 16px; color: #000000; font-weight: 600; }
.menu-item i { color: #000000; width: 20px; font-size: 18px; }
@media (max-width: 768px) { .brand-s { font-size: 36px; } .brand-killlink { font-size: 20px; } .messages-dropdown, .notifications-dropdown { right: 10px; left: 10px; min-width: auto; max-width: none; } }
</style>