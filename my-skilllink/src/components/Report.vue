<template>
  <div class="report-page">
    <Navbar />
    
    <!-- Loading State -->
    <div v-if="submitting" class="loading-overlay">
      <div class="spinner"></div>
      <p>Submitting your report...</p>
    </div>
    
    <!-- Success Message -->
    <div v-if="showSuccess" class="success-overlay">
      <div class="success-icon">✓</div>
      <p>Thank you! Your report has been submitted successfully.</p>
      <button @click="showSuccess = false; deleteAll()" class="btn-back">Back to Form</button>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="error-overlay">
      <p>{{ error }}</p>
      <button @click="error = null" class="btn-retry">Try Again</button>
    </div>
    
    <!-- Report Form (Only show if not submitting/success) -->
    <div v-else class="container py-5 px-4">
      <div class="report-form-container">
        <h1 class="form-title">Report an issue</h1>
        <p class="form-subtitle">Please use the form below to report any issue you are facing.</p>
        
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="formData.name" placeholder="Name" class="form-input" required>
          </div>
          <div class="form-group">
            <input type="email" v-model="formData.email" placeholder="Email" class="form-input" required>
          </div>
          <div class="form-group">
            <select v-model="formData.issueType" class="form-input" required>
              <option value="" disabled>Type of issue</option>
              <option value="technical">Technical Issue</option>
              <option value="payment">Payment Issue</option>
              <option value="account">Account Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <textarea v-model="formData.description" placeholder="Describe your issue" class="form-textarea" rows="5" required></textarea>
          </div>
          <div class="form-group">
            <div class="file-upload-wrapper">
              <input type="file" @change="handleFileUpload" class="file-input" id="fileUpload" accept="image/*,.pdf,.doc,.docx">
              <label for="fileUpload" class="file-label">
                <span>{{ formData.file ? formData.file.name : 'Upload File (optional)' }}</span>
                <i class="fas fa-paperclip file-icon"></i>
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="deleteAll" class="btn-delete">Delete all</button>
            <button type="submit" class="btn-submit" :disabled="submitting">
              {{ submitting ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Robot Icon -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle"><img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img"></div>
    </div>

    <!-- Chatbot Modal -->
    <div v-if="showChatbot" class="chatbot-modal" @click.self="closeChatbot">
      <div class="chatbot-container">
        <div class="chatbot-header"><h3>SkillLink Chatbot</h3><button class="close-chatbot" @click="closeChatbot"><i class="fas fa-times"></i></button></div>
        <div class="chatbot-body"><iframe src="https://graduation-chatbot-project--toqamohsen592.replit.app" frameborder="0" class="chatbot-iframe"></iframe></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
// ✅ استخدام مسار نسبي صحيح (من مجلد components لـ services)
import { userAPI } from '../services/api'

export default {
  name: 'Report',
  components: { Navbar },
  data() {
    return {
      showChatbot: false,
      
      // API States
      submitting: false,
      error: null,
      showSuccess: false,
      
      // Form Data
      formData: { 
        name: '', 
        email: '', 
        issueType: '', 
        description: '', 
        file: null 
      }
    }
  },
  methods: {
    // === Chatbot Methods ===
    toggleChatbot() { this.showChatbot = !this.showChatbot; },
    closeChatbot() { this.showChatbot = false; },
    
    // === Form Methods ===
    
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB')
          event.target.value = ''
          return
        }
        this.formData.file = file
      }
    },
    
    deleteAll() {
      this.formData = { 
        name: '', 
        email: '', 
        issueType: '', 
        description: '', 
        file: null 
      }
      // Reset file input
      const fileInput = document.getElementById('fileUpload')
      if (fileInput) fileInput.value = ''
    },
    
    async submitForm() {
      // Validate form
      if (!this.formData.name || !this.formData.email || !this.formData.issueType || !this.formData.description) {
        alert('Please fill all required fields')
        return
      }
      
      try {
        this.submitting = true
        this.error = null
        
        // Prepare data for API
        const reportData = {
          name: this.formData.name,
          email: this.formData.email,
          issue_type: this.formData.issueType,
          description: this.formData.description
        }
        
        // If there's a file, use FormData
        if (this.formData.file) {
          const formData = new FormData()
          formData.append('name', reportData.name)
          formData.append('email', reportData.email)
          formData.append('issue_type', reportData.issue_type)
          formData.append('description', reportData.description)
          formData.append('file', this.formData.file)
          
          // Call API with FormData
          await userAPI.submitReport(formData)
        } else {
          // Call API with JSON
          await userAPI.submitReport(reportData)
        }
        
        // Show success message
        this.showSuccess = true
        
      } catch (err) {
        console.error('Error submitting report:', err)
        
        // Fallback: Save to localStorage and show success
        const savedReports = JSON.parse(localStorage.getItem('savedReports') || '[]')
        savedReports.push({
          ...this.formData,
          submittedAt: new Date().toISOString()
        })
        localStorage.setItem('savedReports', JSON.stringify(savedReports))
        
        this.error = 'Could not submit report to server. Saved locally instead.'
        
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
/* ✅ كل الـ CSS الأصلي زي ما هو - لم أغير أي سطر */
.report-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
.report-form-container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; padding: 50px 40px; box-shadow: 3px 3px 6px rgba(0,0,0,0.1); border: 1px solid #E0E0E0; }
.form-title { font-size: 32px; font-weight: 700; color: #0C9892; text-align: center; margin-bottom: 10px; }
.form-subtitle { font-size: 16px; color: #333; text-align: center; margin-bottom: 30px; line-height: 1.5; }
.form-group { margin-bottom: 20px; }
.form-input, .form-textarea { width: 100%; padding: 14px 20px; border: 1px solid #CCCCCC; border-radius: 30px; font-size: 16px; outline: none; transition: all 0.3s; background-color: #FFFFFF; font-family: 'Lato', sans-serif; }
.form-input:focus, .form-textarea:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12, 152, 146, 0.1); }
.form-textarea { border-radius: 20px; resize: vertical; }
.form-input::placeholder, .form-textarea::placeholder { color: #CCCCCC; }
.file-upload-wrapper { position: relative; }
.file-input { display: none; }
.file-label { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border: 1px solid #CCCCCC; border-radius: 30px; cursor: pointer; background-color: #FFFFFF; transition: all 0.3s; }
.file-label:hover { border-color: #0C9892; }
.file-label span { color: #333; font-size: 16px; }
.file-icon { color: #000; font-size: 18px; }
.form-actions { display: flex; gap: 15px; margin-top: 30px; }
.btn-delete, .btn-submit { flex: 1; padding: 14px 30px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; }
.btn-delete { background-color: #FFFFFF; border: 1px solid #000000; color: #000000; }
.btn-delete:hover { background-color: #F5F5F5; }
.btn-submit { background-color: #0C9892; color: #FFFFFF; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); }
.btn-submit:hover { background-color: #0a827d; transform: translateY(-2px); box-shadow: 4px 4px 8px rgba(0,0,0,0.2); }
.btn-submit:disabled { background-color: #ccc; cursor: not-allowed; transform: none; }

/* Loading & Success & Error Overlays (New - Minimal) */
.loading-overlay, .success-overlay, .error-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2000; text-align: center; padding: 20px; }
.spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #0C9892; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.success-icon { width: 80px; height: 80px; border-radius: 50%; background: #22C55E; color: white; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: bold; margin-bottom: 20px; }
.error-overlay { color: #dc3545; }
.btn-retry, .btn-back { padding: 10px 25px; background: #0C9892; color: white; border: none; border-radius: 25px; cursor: pointer; margin-top: 15px; font-weight: 600; }
.btn-retry:hover, .btn-back:hover { background: #0a827d; }

/* Robot & Chatbot (Unchanged) */
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
@media (max-width: 768px) { .robot-wrapper { display: none; } .report-form-container { padding: 30px 20px; } }
</style>