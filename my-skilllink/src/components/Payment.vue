<template>
  <div class="payment-page">
    <!-- زر الرجوع من الشات بوت -->
    <div v-if="showBackButton" class="back-to-skilllink">
      <button @click="goBackToSkillLink" class="btn-back">
        <i class="fas fa-arrow-left"></i> Back to SkillLink
      </button>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid px-4">
        <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="goBack">
          <span class="brand-s">S</span><span class="brand-killlink">killLink</span>
        </a>
        <div class="nav-icons-wrapper d-flex align-items-center gap-3">
          <div class="icon-with-badge">
            <img src="/src/assets/messages.png" alt="Chat" class="nav-icon" :class="{ active: showMessages }" @click="toggleMessages">
            <div class="badge-message" v-if="messageCount > 0">{{ messageCount }}</div>
          </div>
          <div class="icon-with-badge">
            <img src="/src/assets/notification.png" alt="Notifications" class="nav-icon" :class="{ active: showNotifications }" @click="toggleNotifications">
            <div class="badge-notification" v-if="notificationCount > 0">{{ notificationCount }}</div>
          </div>
          <div class="profile-pic" @click="goToProfile">
            <img :src="userAvatar || '/src/assets/pexels danx.jpg'" alt="Profile" class="rounded-circle">
          </div>
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

    <!-- Main Payment Content -->
    <div class="payment-container">
      
      <!-- Loading State -->
      <div v-if="processing" class="loading-overlay">
        <div class="spinner"></div>
        <p>Processing payment...</p>
      </div>
      
      <!-- Success State -->
      <div v-else-if="paymentSuccess" class="success-overlay">
        <div class="success-icon">✓</div>
        <p>Payment completed successfully! 🎉</p>
        <button @click="goBack" class="btn-back">Back to Dashboard</button>
      </div>
      
      <!-- Error State -->
      <div v-else-if="paymentError" class="error-overlay">
        <p>{{ paymentError }}</p>
        <button @click="paymentError = null" class="btn-retry">Try Again</button>
      </div>
      
      <!-- Payment Form (Only show if not processing/success) -->
      <template v-else>
        <h1 class="page-title">Payment</h1>
        <p class="page-subtitle">All transactions are secured and encrypted</p>

        <!-- Payment Card -->
        <div class="payment-card">
          <!-- Project Info -->
          <div class="payment-header">
            <div class="project-info">
              <h3 class="project-title">Project : {{ offerData.project }}</h3>
              <p class="project-total">Total : {{ offerData.price }} $</p>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="payment-methods">
            
            <!-- 1. Credit Card -->
            <div class="payment-method">
              <div class="method-header" @click="toggleMethod('creditCard')">
                <div class="method-left">
                  <img src="/src/assets/credit card.png" alt="Credit Card" class="method-icon">
                  <span class="method-name">Credit card</span>
                </div>
                <i class="fas fa-chevron-right method-arrow" :class="{ 'arrow-down': openMethod === 'creditCard' }"></i>
              </div>
              <div v-if="openMethod === 'creditCard'" class="method-body">
                <div class="payment-form">
                  <input type="text" v-model="creditCard.number" placeholder="Card number" class="form-input" maxlength="19">
                  <input type="text" v-model="creditCard.expiry" placeholder="Expiration date" class="form-input" maxlength="7">
                  <input type="text" v-model="creditCard.securityCode" placeholder="Security code" class="form-input" maxlength="4">
                  <input type="text" v-model="creditCard.cardName" placeholder="Name of card" class="form-input">
                  <button class="btn-pay" @click="processPayment('creditCard')" :disabled="processing">
                    {{ processing ? 'Processing...' : 'Pay' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 2. Vodafone Cash -->
            <div class="payment-method">
              <div class="method-header" @click="toggleMethod('vodafone')">
                <div class="method-left">
                  <img src="/src/assets/vodafone.png" alt="Vodafone" class="method-icon">
                  <span class="method-name">Vodafone cash</span>
                </div>
                <i class="fas fa-chevron-right method-arrow" :class="{ 'arrow-down': openMethod === 'vodafone' }"></i>
              </div>
              <div v-if="openMethod === 'vodafone'" class="method-body">
                <div class="payment-form">
                  <input type="tel" v-model="vodafone.mobile" placeholder="Mobile number" class="form-input" maxlength="11">
                  <div class="file-upload">
                    <input type="file" @change="handleFileUpload('vodafone')" id="vodafoneFile" class="file-input" accept="image/*,.pdf">
                    <label for="vodafoneFile" class="file-label">
                      <span>{{ vodafone.receiptName || 'Upload receipt' }}</span>
                      <i class="fas fa-paperclip file-icon"></i>
                    </label>
                  </div>
                  <button class="btn-pay" @click="processPayment('vodafone')" :disabled="processing">
                    {{ processing ? 'Processing...' : 'I have paid' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 3. Fawry -->
            <div class="payment-method">
              <div class="method-header" @click="toggleMethod('fawry')">
                <div class="method-left">
                  <img src="/src/assets/fawry.png" alt="Fawry" class="method-icon">
                  <span class="method-name">Fawry</span>
                </div>
                <i class="fas fa-chevron-right method-arrow" :class="{ 'arrow-down': openMethod === 'fawry' }"></i>
              </div>
              <div v-if="openMethod === 'fawry'" class="method-body">
                <div class="payment-form">
                  <input type="text" v-model="fawry.code" placeholder="Fawry code" class="form-input" maxlength="15">
                  <input type="text" v-model="fawry.expiry" placeholder="Expiry info" class="form-input">
                  <button class="btn-pay" @click="processPayment('fawry')" :disabled="processing">
                    {{ processing ? 'Processing...' : 'Pay' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- 4. Instapay -->
            <div class="payment-method">
              <div class="method-header" @click="toggleMethod('instapay')">
                <div class="method-left">
                  <img src="/src/assets/Instapay.png" alt="Instapay" class="method-icon">
                  <span class="method-name">Instapay</span>
                </div>
                <i class="fas fa-chevron-right method-arrow" :class="{ 'arrow-down': openMethod === 'instapay' }"></i>
              </div>
              <div v-if="openMethod === 'instapay'" class="method-body">
                <div class="payment-form">
                  <input type="text" v-model="instapay.recipient" placeholder="Recipient name" class="form-input">
                  <input type="text" v-model="instapay.idOrPhone" placeholder="Instapay ID / Phone number" class="form-input">
                  <input type="text" v-model="instapay.bankName" placeholder="Bank name" class="form-input">
                  <div class="file-upload">
                    <input type="file" @change="handleFileUpload('instapay')" id="instapayFile" class="file-input" accept="image/*,.pdf">
                    <label for="instapayFile" class="file-label">
                      <span>{{ instapay.receiptName || 'Upload receipt' }}</span>
                      <i class="fas fa-paperclip file-icon"></i>
                    </label>
                  </div>
                  <button class="btn-pay" @click="processPayment('instapay')" :disabled="processing">
                    {{ processing ? 'Processing...' : 'Pay' }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </template>
    </div>

    <!-- ✅ Fixed: Robot Icon with proper chatbot toggle (Modal style) -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle">
        <img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img">
      </div>
    </div>

    <!-- ✅ Fixed: Chatbot Modal (works on all pages) -->
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
import { clientAPI } from '../services/api'

export default {
  name: 'Payment',
  data() {
    return {
      showBackButton: false,
      showMenu: false,
      showMessages: false,
      showNotifications: false,
      messageCount: 3,
      notificationCount: 2,
      openMethod: null,
      
      // ✅ Fixed: Chatbot state
      showChatbot: false,
      
      // API States
      processing: false,
      paymentError: null,
      paymentSuccess: false,
      userAvatar: null,
      
      // Offer Data from query params
      offerData: { 
        project: 'Mobile app UI design', 
        price: 1200,
        offerId: null,
        freelancerName: '',
        freelancerSlug: '',
        deliveryTime: ''
      },
      
      // Payment Forms
      creditCard: { number: '', expiry: '', securityCode: '', cardName: '' },
      vodafone: { mobile: '', receipt: null, receiptName: '' },
      fawry: { code: '', expiry: '' },
      instapay: { recipient: '', idOrPhone: '', bankName: '', receipt: null, receiptName: '' },
      
      // Dropdowns Data
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
  
  async mounted() {
    // 1. Load user avatar from profile
    try {
      const profileRes = await clientAPI.getClientProfile()
      const profile = profileRes.data.data || profileRes.data
      this.userAvatar = profile.profile_picture || profile.avatar
    } catch (e) {
      console.log('Profile load skipped')
    }
    
    // 2. Get offer data from query params
    const { 
      offerId, offerName, offerPrice, offerProject, 
      freelancerName, freelancerSlug, freelancerAvatar,
      price, projectTitle, deliveryTime 
    } = this.$route.query
    
    if (offerProject || projectTitle) {
      this.offerData = {
        id: offerId,
        project: offerProject || projectTitle,
        price: offerPrice || price || 1200,
        freelancerName: freelancerName || offerName,
        freelancerSlug: freelancerSlug,
        freelancerAvatar: freelancerAvatar,
        deliveryTime: deliveryTime
      }
    }
    
    // 3. Check for back button
    if (document.referrer.includes('replit.app')) {
      this.showBackButton = true
    }
  },
  
  methods: {
    // ✅ Fixed: Chatbot methods (consistent modal approach)
    toggleChatbot() { this.showChatbot = !this.showChatbot; },
    closeChatbot() { this.showChatbot = false; },
    
    // === Navigation ===
    goBackToSkillLink() {
      const returnPage = localStorage.getItem('returnPage') || '/'
      window.location.href = returnPage
    },
    goBack() { this.$router.push('/client-home') },
    goToProfile() { this.$router.push('/profile'); this.showMenu = false },
    goToSettings() { this.$router.push('/settings'); this.showMenu = false },
    goToSaved() { this.$router.push('/saved'); this.showMenu = false },
    goToReport() { this.$router.push('/report'); this.showMenu = false },
    goToLogout() { 
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      alert('Logged out successfully!')
      this.$router.push('/login')
      this.showMenu = false
    },
    
    // === Dropdowns ===
    toggleMenu() { this.showMenu = !this.showMenu; this.showMessages = false; this.showNotifications = false },
    toggleMessages() { this.showMessages = !this.showMessages; this.showNotifications = false; this.showMenu = false },
    toggleNotifications() { this.showNotifications = !this.showNotifications; this.showMessages = false; this.showMenu = false },
    toggleMethod(method) { this.openMethod = this.openMethod === method ? null : method },
    
    // === File Upload ===
    handleFileUpload(method) {
      const input = method === 'vodafone' 
        ? document.getElementById('vodafoneFile') 
        : document.getElementById('instapayFile')
      
      if (input && input.files[0]) {
        const file = input.files[0]
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB')
          input.value = ''
          return
        }
        if (method === 'vodafone') { 
          this.vodafone.receipt = file
          this.vodafone.receiptName = file.name 
        } else { 
          this.instapay.receipt = file
          this.instapay.receiptName = file.name 
        }
      }
    },
    
    // === API Integration: Process Payment ===
    async processPayment(method) {
      // Validate form
      let isValid = true
      if (method === 'creditCard') { 
        if (!this.creditCard.number || !this.creditCard.expiry || !this.creditCard.securityCode || !this.creditCard.cardName) isValid = false 
      }
      else if (method === 'vodafone') { 
        if (!this.vodafone.mobile) isValid = false 
      }
      else if (method === 'fawry') { 
        if (!this.fawry.code || !this.fawry.expiry) isValid = false 
      }
      else if (method === 'instapay') { 
        if (!this.instapay.recipient || !this.instapay.idOrPhone || !this.instapay.bankName) isValid = false 
      }
      
      if (!isValid) { 
        alert('Please fill in all required fields.')
        return 
      }
      
      try {
        this.processing = true
        this.paymentError = null
        
        // Prepare payment data
        const paymentData = {
          offer_id: this.offerData.id,
          amount: parseFloat(this.offerData.price),
          project_title: this.offerData.project,
          freelancer_name: this.offerData.freelancerName,
          payment_method: method,
          payment_details: {}
        }
        
        // Add method-specific details
        if (method === 'creditCard') {
          paymentData.payment_details = {
            card_number: this.creditCard.number.replace(/\s/g, ''),
            expiry: this.creditCard.expiry,
            cvv: this.creditCard.securityCode,
            cardholder_name: this.creditCard.cardName
          }
        }
        else if (method === 'vodafone') {
          paymentData.payment_details = { mobile: this.vodafone.mobile }
        }
        else if (method === 'fawry') {
          paymentData.payment_details = { 
            fawry_code: this.fawry.code,
            expiry: this.fawry.expiry
          }
        }
        else if (method === 'instapay') {
          paymentData.payment_details = {
            recipient: this.instapay.recipient,
            identifier: this.instapay.idOrPhone,
            bank: this.instapay.bankName
          }
        }
        
        // Call API to process payment
        const response = await clientAPI.topUpWallet(paymentData)
        
        // Payment successful!
        this.paymentSuccess = true
        this.clearFormData()
        
      } catch (err) {
        console.error('Payment error:', err)
        
        // Fallback: Save payment to localStorage and show success
        const savedPayments = JSON.parse(localStorage.getItem('savedPayments') || '[]')
        savedPayments.push({
          ...paymentData,
          status: 'pending',
          createdAt: new Date().toISOString()
        })
        localStorage.setItem('savedPayments', JSON.stringify(savedPayments))
        
        this.paymentError = 'Could not process payment on server. Saved locally instead.'
        
      } finally {
        this.processing = false
      }
    },
    
    // Helper: Clear form data after payment
    clearFormData() {
      this.creditCard = { number: '', expiry: '', securityCode: '', cardName: '' }
      this.vodafone = { mobile: '', receipt: null, receiptName: '' }
      this.fawry = { code: '', expiry: '' }
      this.instapay = { recipient: '', idOrPhone: '', bankName: '', receipt: null, receiptName: '' }
      const vodafoneInput = document.getElementById('vodafoneFile')
      const instapayInput = document.getElementById('instapayFile')
      if (vodafoneInput) vodafoneInput.value = ''
      if (instapayInput) instapayInput.value = ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.back-to-skilllink { position: fixed; top: 20px; left: 20px; z-index: 9999; }
.btn-back { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: white; border: none; padding: 12px 24px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 3px 3px 8px rgba(0,0,0,0.2); transition: all 0.3s; display: flex; align-items: center; gap: 8px; }
.btn-back:hover { transform: translateY(-2px); box-shadow: 4px 4px 12px rgba(0,0,0,0.3); }

.payment-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
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

.payment-container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
.page-title { font-size: 32px; font-weight: 700; color: #000000; margin-bottom: 8px; }
.page-subtitle { font-size: 18px; color: #333; margin-bottom: 35px; }
.payment-card { background-color: #FFFFFF; border-radius: 20px; box-shadow: 3px 3px 10px rgba(0,0,0,0.1); border: 2px solid #E0E0E0; overflow: hidden; }
.payment-header { padding: 30px 35px; border-bottom: 2px solid #E0E0E0; }
.project-title { font-size: 22px; font-weight: 700; color: #000000; margin: 0 0 10px 0; }
.project-total { font-size: 20px; font-weight: 600; color: #333; margin: 0; }
.payment-methods { padding: 10px 35px 25px; }
.payment-method { padding: 10px 0; }
.method-header { display: flex; align-items: center; justify-content: space-between; cursor: pointer; padding: 12px 0; transition: all 0.2s; }
.method-header:hover { opacity: 0.8; }
.method-left { display: flex; align-items: center; gap: 15px; }
.method-icon { width: 32px; height: 32px; object-fit: contain; }
.method-name { font-size: 20px; font-weight: 600; color: #000000; }
.method-arrow { font-size: 18px; color: #333; transition: transform 0.3s; }
.method-arrow.arrow-down { transform: rotate(90deg); }
.divider { height: 1px; background-color: #E0E0E0; margin: 0; }
.method-body { padding: 15px 0 20px; animation: slideDown 0.3s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.payment-form { display: flex; flex-direction: column; gap: 12px; }
.form-input { width: 100%; padding: 14px 20px; border: 2px solid #CCCCCC; border-radius: 30px; font-size: 16px; outline: none; transition: all 0.3s; background-color: #FFFFFF; font-family: 'Lato', sans-serif; }
.form-input:focus { border-color: #0C9892; box-shadow: 0 0 0 4px rgba(12, 152, 146, 0.15); }
.file-upload { position: relative; }
.file-input { display: none; }
.file-label { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border: 2px solid #CCCCCC; border-radius: 30px; cursor: pointer; background-color: #FFFFFF; transition: all 0.3s; font-size: 16px; color: #CCCCCC; font-family: 'Lato', sans-serif; }
.file-label:hover { border-color: #0C9892; }
.file-icon { color: #999; font-size: 18px; }
.btn-pay { width: 100%; padding: 16px 30px; background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: #FFFFFF; border: none; border-radius: 30px; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 3px 3px 8px rgba(12, 152, 146, 0.3); margin-top: 5px; }
.btn-pay:hover { background: linear-gradient(135deg, #0a827d 0%, #129e96 100%); transform: translateY(-2px); box-shadow: 5px 5px 12px rgba(12, 152, 146, 0.4); }
.btn-pay:disabled { background: #ccc; cursor: not-allowed; transform: none; }

/* Loading & Success & Error Overlays */
.loading-overlay, .success-overlay, .error-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2000; text-align: center; padding: 20px; }
.spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #0C9892; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.success-icon { width: 80px; height: 80px; border-radius: 50%; background: #22C55E; color: white; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: bold; margin-bottom: 20px; }
.error-overlay { color: #dc3545; }
.btn-retry { padding: 10px 25px; background: #0C9892; color: white; border: none; border-radius: 25px; cursor: pointer; margin-top: 15px; font-weight: 600; }
.btn-retry:hover { background: #0a827d; }

/* Robot & Chatbot */
.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }

.chatbot-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.chatbot-container { background-color: white; border-radius: 20px; width: 90%; max-width: 500px; height: 80vh; max-height: 700px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; animation: slideUp 0.3s ease; }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.chatbot-header { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.chatbot-header h3 { margin: 0; font-size: 20px; font-weight: 700; }
.close-chatbot { background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }
.close-chatbot:hover { background-color: rgba(255,255,255,0.2); transform: rotate(90deg); }
.chatbot-body { flex: 1; overflow: hidden; }
.chatbot-iframe { width: 100%; height: 100%; border: none; }

@media (max-width: 768px) { 
  .brand-s { font-size: 36px; } 
  .brand-killlink { font-size: 20px; } 
  .payment-container { padding: 30px 15px; } 
  .payment-methods { padding: 10px 20px 25px; } 
  .payment-header { padding: 25px 20px; } 
  .messages-dropdown, .notifications-dropdown { right: 10px; left: 10px; min-width: auto; max-width: none; } 
  .robot-wrapper { display: none; } 
}
</style>