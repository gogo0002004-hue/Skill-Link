<template>
  <div class="client-settings-page">
    <ClientNavbar />
    <div class="settings-container">
      <!-- Sidebar -->
      <div class="settings-sidebar">
        <div class="sidebar-item" :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'">
          <i class="fas fa-user-circle"></i><span>Account settings</span>
        </div>
        <div class="sidebar-item" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
          <i class="fas fa-user"></i><span>Profile information</span>
        </div>
        <div class="sidebar-item" :class="{ active: activeTab === 'security' }" @click="activeTab = 'security'">
          <i class="fas fa-shield-alt"></i><span>Security</span>
        </div>
        <div class="sidebar-item" :class="{ active: activeTab === 'notifications' }" @click="activeTab = 'notifications'">
          <i class="fas fa-bell"></i><span>Notifications</span>
        </div>
        <div class="sidebar-item" :class="{ active: activeTab === 'privacy' }" @click="activeTab = 'privacy'">
          <i class="fas fa-lock"></i><span>Privacy</span>
        </div>
        <div class="sidebar-item" :class="{ active: activeTab === 'language' }" @click="activeTab = 'language'">
          <i class="fas fa-language"></i><span>Language</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="settings-content">
        
        <!-- Account Settings -->
        <div v-if="activeTab === 'account'" class="settings-section">
          <h3 class="section-subtitle">Account Information</h3>
          <div class="form-group"><label class="form-label">Email</label><input type="email" v-model="accountData.email" class="form-input" :readonly="!isEditing" @focus="isEditing = true"></div>
          <div class="form-group"><label class="form-label">Username</label><input type="text" v-model="accountData.username" class="form-input" :readonly="!isEditing"></div>
          <div class="form-group"><label class="form-label">Account type</label><input type="text" v-model="accountData.accountType" class="form-input" readonly></div>
          <div class="form-actions">
            <button class="btn-save" v-if="isEditing" @click="saveAccount">Save <i class="fas fa-check"></i></button>
            <button class="btn-cancel" v-if="isEditing" @click="cancelEdit">Cancel <i class="fas fa-times"></i></button>
          </div>
        </div>

        <!-- Profile Information -->
        <div v-if="activeTab === 'profile'" class="settings-section">
          <h3 class="section-subtitle">Profile Information</h3>
          <div class="profile-photo-section">
            <img src="/src/assets/pexels danx.jpg" alt="Profile" class="profile-photo">
            <button class="btn-change-photo" @click="changePhoto">Change Photo <i class="fas fa-camera"></i></button>
          </div>
          <div class="form-group"><label class="form-label">Full name</label><input type="text" v-model="profileData.fullName" class="form-input"></div>
          <div class="form-group"><label class="form-label">Bio</label><textarea v-model="profileData.bio" class="form-input" rows="3"></textarea></div>
          <div class="form-group"><label class="form-label">Company Name</label><input type="text" v-model="profileData.companyName" class="form-input"></div>
          <div class="form-group"><label class="form-label">Industry</label><input type="text" v-model="profileData.industry" class="form-input"></div>
          <div class="form-group"><label class="form-label">Website</label><input type="url" v-model="profileData.website" class="form-input"></div>
          <div class="form-group"><label class="form-label">Location</label><input type="text" v-model="profileData.location" class="form-input"></div>
          <div class="form-group">
            <label class="form-label">Skills</label>
            <div class="skills-container">
              <span class="skill-tag" v-for="(skill, index) in profileData.skills" :key="index">{{ skill }} <span class="remove-skill" @click="removeSkill(index)">×</span></span>
              <button class="btn-add-skill" @click="addSkill"><i class="fas fa-plus"></i> Add Skill</button>
            </div>
          </div>
          <button class="btn-save" @click="saveProfile">Save Profile <i class="fas fa-check"></i></button>
        </div>

        <!-- Security -->
        <div v-if="activeTab === 'security'" class="settings-section">
          <h3 class="section-subtitle">Change password</h3>
          <div class="form-row">
            <label class="form-label">Password</label>
            <div class="password-input-wrapper">
              <input :type="showPassword ? 'text' : 'password'" v-model="securityData.password" class="form-input" :readonly="!isEditingPassword">
              <button class="toggle-password" @click="showPassword = !showPassword" type="button"><i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i></button>
            </div>
            <button class="btn-change" @click="togglePasswordEdit" v-if="!isEditingPassword">Change <i class="fas fa-edit"></i></button>
            <div class="edit-actions-inline" v-else>
              <button class="btn-save-small" @click="savePassword">Save <i class="fas fa-check"></i></button>
              <button class="btn-cancel-small" @click="cancelPasswordEdit">Cancel <i class="fas fa-times"></i></button>
            </div>
          </div>
          <h3 class="section-subtitle">Account recovery</h3>
          <div class="form-row">
            <label class="form-label">Recovery email</label>
            <input type="email" v-model="securityData.recoveryEmail" class="form-input" :readonly="!isEditingRecoveryEmail">
            <button class="btn-change" @click="toggleRecoveryEmailEdit" v-if="!isEditingRecoveryEmail">Change <i class="fas fa-edit"></i></button>
            <div class="edit-actions-inline" v-else>
              <button class="btn-save-small" @click="saveRecoveryEmail">Save <i class="fas fa-check"></i></button>
              <button class="btn-cancel-small" @click="cancelRecoveryEmailEdit">Cancel <i class="fas fa-times"></i></button>
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">Recovery phone</label>
            <input type="tel" v-model="securityData.recoveryPhone" class="form-input" :readonly="!isEditingRecoveryPhone">
            <button class="btn-change" @click="toggleRecoveryPhoneEdit" v-if="!isEditingRecoveryPhone">Change <i class="fas fa-edit"></i></button>
            <div class="edit-actions-inline" v-else>
              <button class="btn-save-small" @click="saveRecoveryPhone">Save <i class="fas fa-check"></i></button>
              <button class="btn-cancel-small" @click="cancelRecoveryPhoneEdit">Cancel <i class="fas fa-times"></i></button>
            </div>
          </div>
          <h3 class="section-subtitle">Security alerts</h3>
          <div class="alerts-container">
            <div class="alerts-left">
              <h4>Security alerts</h4>
              <label class="checkbox-label"><input type="checkbox" v-model="securityAlerts.newLogin"><span>New login alerts</span></label>
              <label class="checkbox-label"><input type="checkbox" v-model="securityAlerts.passwordChange"><span>Password change alerts</span></label>
              <label class="checkbox-label"><input type="checkbox" v-model="securityAlerts.deviceLogin"><span>Device login alerts</span></label>
            </div>
            <div class="alerts-right">
              <h4>Security alerts to</h4>
              <label class="radio-label"><input type="radio" v-model="securityAlerts.sendTo" value="email"><span>Email only</span></label>
              <label class="radio-label"><input type="radio" v-model="securityAlerts.sendTo" value="email-sms"><span>Email and SMS</span></label>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'notifications'" class="settings-section">
          <h3 class="section-subtitle">Notification Preferences</h3>
          <div class="notification-item" v-for="(notif, index) in notificationsSettings" :key="index">
            <div class="notification-icon"><i :class="notif.icon" class="notif-icon"></i></div>
            <div class="notification-content"><h4 class="notification-title">{{ notif.title }}</h4><p class="notification-description">{{ notif.description }}</p></div>
            <div class="toggle-wrapper"><label class="toggle-switch"><input type="checkbox" v-model="notif.enabled"><span class="toggle-slider"></span></label></div>
          </div>
        </div>

        <!-- Privacy Settings (تم التعديل هنا) -->
        <div v-if="activeTab === 'privacy'" class="settings-section">
          <h3 class="section-subtitle">Privacy Settings</h3>
          <div class="privacy-item" v-for="(privacy, index) in privacySettings" :key="index">
            <div class="privacy-icon-box">
              <!-- شرط لعرض الصورة أو الأيقونة بناءً على البيانات -->
              <img v-if="privacy.type === 'image'" :src="privacy.src" class="privacy-img-icon" alt="icon">
              <i v-else :class="privacy.icon" class="privacy-icon-item"></i>
            </div>
            <div class="privacy-content">
              <h4 class="privacy-title">{{ privacy.title }}</h4>
              <p class="privacy-description">{{ privacy.description }}</p>
            </div>
            <div class="toggle-wrapper">
              <label class="toggle-switch">
                <input type="checkbox" v-model="privacy.enabled">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Language -->
        <div v-if="activeTab === 'language'" class="settings-section">
          <h3 class="section-subtitle">Choose your language</h3>
          <div class="language-container">
            <div class="language-option" :class="{ active: selectedLanguage === 'english' }" @click="selectedLanguage = 'english'">
              <span class="language-name">English</span><div class="radio-custom" :class="{ selected: selectedLanguage === 'english' }"></div>
            </div>
            <div class="language-option" :class="{ active: selectedLanguage === 'arabic' }" @click="selectedLanguage = 'arabic'">
              <span class="language-name">Arabic</span><div class="radio-custom" :class="{ selected: selectedLanguage === 'arabic' }"></div>
            </div>
            <div class="language-option add-language" @click="addLanguage">
              <span class="add-icon">+</span><span class="language-name">Add a language</span>
            </div>
          </div>
        </div>
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
import ClientNavbar from './ClientNavbar.vue'

export default {
  name: 'ClientSettings',
  components: { ClientNavbar },
  data() {
    return {
      showChatbot: false,
      activeTab: 'account',
      isEditing: false,
      isEditingPassword: false,
      isEditingRecoveryEmail: false,
      isEditingRecoveryPhone: false,
      showPassword: false,
      
      accountData: { email: 'moataz.salah@gmail.com', username: 'Moataz Salah', accountType: 'Business Owner' },
      profileData: { 
        fullName: 'Moataz Salah', 
        bio: 'Business Owner at SafeZone Solutions', 
        companyName: 'SafeZone Solutions', 
        industry: 'Cybersecurity & Web Development', 
        website: 'www.safezone.com', 
        location: 'Alexandria, Egypt', 
        skills: ['Project Management', 'Business Strategy', 'Cybersecurity'] 
      },
      securityData: { password: '********', recoveryEmail: 'moataz.backup@gmail.com', recoveryPhone: '+20 1112223333' },
      securityAlerts: { newLogin: true, passwordChange: true, deviceLogin: true, sendTo: 'email-sms' },
      
      notificationsSettings: [
        { title: 'New project proposals', description: 'Receive notifications when freelancers submit proposals', icon: 'fas fa-briefcase', enabled: true },
        { title: 'Messages notifications', description: 'Get notified when you receive new messages', icon: 'fas fa-comment', enabled: true },
        { title: 'Payment updates', description: 'Be alerted about payment updates and transactions', icon: 'fas fa-credit-card', enabled: true },
        { title: 'Email notification', description: 'Receive important updates and offers to your email', icon: 'fas fa-envelope', enabled: true },
        { title: 'Project completion alerts', description: 'Get notified when projects are completed', icon: 'fas fa-check-circle', enabled: true }
      ],
      
      privacySettings: [
        // التعديل هنا: تم وضع الصورة وتعيين النوع كـ 'image'
        { title: 'Show profile to freelancers', description: 'Make profile visible and searchable by freelancers', type: 'image', src: '/src/assets/search account.png', enabled: true },
        { title: 'Show online status', description: 'Let others see when you are online', type: 'icon', icon: 'fas fa-signal', enabled: true },
        { title: 'Allow messages from anyone', description: 'Receive messages from any registered user', type: 'icon', icon: 'fas fa-comments', enabled: true },
        { title: 'Show company information', description: 'Display your company details publicly', type: 'icon', icon: 'fas fa-building', enabled: true }
      ],
      selectedLanguage: 'english'
    }
  },
  mounted() {
    if (document.referrer.includes('replit.app')) {
      this.showBackButton = true;
    }
  },
  methods: {
    toggleChatbot() { 
      this.showChatbot = !this.showChatbot;
    },
    closeChatbot() {
      this.showChatbot = false;
    },
    goBackToSkillLink() {
      const returnPage = localStorage.getItem('returnPage') || '/';
      window.location.href = returnPage;
    },
    cancelEdit() { this.isEditing = false; },
    saveAccount() { alert('Account data saved successfully!'); this.isEditing = false; },
    saveProfile() { alert('Profile saved successfully!'); },
    togglePasswordEdit() { this.isEditingPassword = true; },
    cancelPasswordEdit() { this.isEditingPassword = false; },
    savePassword() { alert('Password changed successfully!'); this.isEditingPassword = false; },
    toggleRecoveryEmailEdit() { this.isEditingRecoveryEmail = true; },
    cancelRecoveryEmailEdit() { this.isEditingRecoveryEmail = false; },
    saveRecoveryEmail() { alert('Recovery email updated successfully!'); this.isEditingRecoveryEmail = false; },
    toggleRecoveryPhoneEdit() { this.isEditingRecoveryPhone = true; },
    cancelRecoveryPhoneEdit() { this.isEditingRecoveryPhone = false; },
    saveRecoveryPhone() { alert('Recovery phone updated successfully!'); this.isEditingRecoveryPhone = false; },
    changePhoto() { alert('Change photo functionality coming soon!'); },
    addSkill() { const skill = prompt('Enter skill name:'); if (skill && skill.trim()) this.profileData.skills.push(skill.trim()); },
    removeSkill(index) { this.profileData.skills.splice(index, 1); },
    addLanguage() { alert('Add language functionality coming soon!'); }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.client-settings-page { min-height: 100vh; background: linear-gradient(135deg, #F5F5F5 0%, #E8F5F5 100%); padding-bottom: 50px; }
.settings-container { display: flex; max-width: 1300px; margin: 40px auto; gap: 35px; padding: 0 20px; }

.settings-sidebar { width: 300px; background: linear-gradient(180deg, #FFFFFF 0%, #F8FFFF 100%); border-radius: 25px; padding: 25px; box-shadow: 4px 4px 12px rgba(12, 152, 146, 0.15); border: 2px solid #E0F5F5; }
.sidebar-item { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-radius: 35px; cursor: pointer; transition: all 0.3s; font-size: 17px; color: #000000; font-weight: 600; margin-bottom: 8px; border: 2px solid transparent; }
.sidebar-item:hover { background-color: #E8F5F5; transform: translateX(5px); }
.sidebar-item.active { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: #FFFFFF; box-shadow: 3px 3px 8px rgba(12, 152, 146, 0.3); transform: translateX(5px); }
.sidebar-item i { font-size: 20px; width: 24px; }

.settings-content { flex: 1; background: linear-gradient(180deg, #FFFFFF 0%, #FAFEFE 100%); border-radius: 25px; padding: 45px; box-shadow: 4px 4px 12px rgba(12, 152, 146, 0.15); border: 2px solid #E0F5F5; }
.settings-section { max-width: 750px; }
.section-subtitle { font-size: 24px; font-weight: 700; color: #0C9892; margin-bottom: 25px; text-shadow: 1px 1px 2px rgba(12, 152, 146, 0.2); }

.form-group { margin-bottom: 28px; }
.form-label { display: block; font-size: 18px; font-weight: 700; color: #0C9892; margin-bottom: 12px; }
.form-input { width: 100%; padding: 16px 22px; border: 2px solid #CCCCCC; border-radius: 35px; font-size: 17px; outline: none; transition: all 0.3s; background-color: #FFFFFF; font-family: 'Lato', sans-serif; }
.form-input:focus { border-color: #0C9892; box-shadow: 0 0 0 4px rgba(12, 152, 146, 0.15); }
.form-input[readonly] { background-color: #F9F9F9; cursor: not-allowed; color: #666; }

.profile-photo-section { text-align: center; margin-bottom: 35px; position: relative; }
.profile-photo { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #0C9892; box-shadow: 4px 4px 12px rgba(12, 152, 146, 0.2); }
.btn-change-photo { position: absolute; bottom: 10px; right: 50%; transform: translateX(80px); background-color: #0C9892; color: #FFFFFF; border: none; border-radius: 25px; padding: 10px 20px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 2px 2px 6px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 6px; }
.btn-change-photo:hover { background-color: #0a827d; transform: translateX(80px) translateY(-2px); }

.skills-container { display: flex; flex-wrap: wrap; gap: 12px; }
.skill-tag { display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; background: linear-gradient(135deg, #E8F5F5 0%, #F0FAFA 100%); border: 2px solid #0C9892; border-radius: 25px; font-size: 15px; color: #0C9892; font-weight: 600; }
.remove-skill { cursor: pointer; font-size: 20px; color: #E63946; transition: all 0.2s; font-weight: bold; }
.remove-skill:hover { transform: scale(1.2); }
.btn-add-skill { background-color: #FFFFFF; border: 2px dashed #0C9892; border-radius: 25px; padding: 10px 20px; font-size: 15px; color: #0C9892; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
.btn-add-skill:hover { background-color: #E8F5F5; transform: scale(1.05); }

.form-row { display: flex; align-items: center; gap: 18px; margin-bottom: 22px; }
.form-row .form-label { min-width: 170px; margin-bottom: 0; }
.form-row .form-input { flex: 1; margin-bottom: 0; }
.password-input-wrapper { position: relative; flex: 1; }
.toggle-password { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #0C9892; font-size: 20px; transition: all 0.2s; }
.toggle-password:hover { color: #14B5A5; transform: translateY(-50%) scale(1.1); }
.btn-change { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: #FFFFFF; border: none; border-radius: 30px; padding: 13px 28px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 3px 3px 8px rgba(12, 152, 146, 0.3); display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.btn-change:hover { transform: translateY(-2px); box-shadow: 5px 5px 12px rgba(12, 152, 146, 0.4); }
.edit-actions-inline { display: flex; gap: 10px; }
.btn-save-small { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: #FFFFFF; border: none; border-radius: 25px; padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 6px; }
.btn-save-small:hover { transform: translateY(-2px); }
.btn-cancel-small { background-color: #FFFFFF; border: 2px solid #E63946; border-radius: 25px; padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s; color: #E63946; display: inline-flex; align-items: center; gap: 6px; }
.btn-cancel-small:hover { background-color: #E63946; color: #FFFFFF; }

.alerts-container { display: flex; gap: 50px; background: linear-gradient(135deg, #F8FFFF 0%, #F0FAFA 100%); padding: 30px; border-radius: 20px; border: 2px solid #E0F5F5; }
.alerts-left, .alerts-right { flex: 1; }
.alerts-left h4, .alerts-right h4 { font-size: 18px; font-weight: 700; color: #0C9892; margin-bottom: 18px; }
.checkbox-label, .radio-label { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 15px; font-size: 16px; color: #333; font-weight: 500; }
.checkbox-label input[type="checkbox"], .radio-label input[type="radio"] { width: 22px; height: 22px; cursor: pointer; accent-color: #0C9892; }

/* Privacy & Notification Items Styling */
.notification-item, .privacy-item { 
  display: flex; align-items: center; gap: 20px; padding: 25px; margin-bottom: 20px; 
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FFFF 100%); border-radius: 20px; 
  border: 2px solid #E0F5F5; transition: all 0.3s; 
}
.notification-item:hover, .privacy-item:hover { transform: translateX(5px); box-shadow: 4px 4px 12px rgba(12, 152, 146, 0.15); border-color: #0C9892; }

.notification-icon, .privacy-icon-box { 
  width: 60px; height: 60px; background: linear-gradient(135deg, #E8F5F5 0%, #F0FAFA 100%); 
  border-radius: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; 
}

/* تنسيق الأيقونات العادية */
.notif-icon, .privacy-icon-item { font-size: 26px; color: #0C9892; }

/* تنسيق الصورة المخصصة لتكون بنفس اللون الفيروزي */
.privacy-img-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  /* هذا الفلتر يغير لون الصورة إلى اللون الفيروزي الأساسي للموقع */
  filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%);
}

.notification-content, .privacy-content { flex: 1; }
.notification-title, .privacy-title { font-size: 20px; font-weight: 700; color: #0C9892; margin: 0 0 8px 0; }
.notification-description, .privacy-description { font-size: 16px; color: #666; margin: 0; line-height: 1.5; }

.toggle-wrapper { flex-shrink: 0; }
.toggle-switch { position: relative; display: inline-block; width: 60px; height: 32px; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #CCCCCC; transition: all 0.4s; border-radius: 32px; border: 2px solid #CCCCCC; }
.toggle-slider:before { position: absolute; content: ""; height: 24px; width: 24px; left: 2px; bottom: 2px; background-color: white; transition: all 0.4s; border-radius: 50%; box-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
input:checked + .toggle-slider { background-color: #0C9892; border-color: #0C9892; }
input:checked + .toggle-slider:before { transform: translateX(28px); }
.toggle-slider:hover { border-color: #0C9892; }

.language-container { max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #FFFFFF 0%, #F8FFFF 100%); border-radius: 20px; border: 2px solid #E0F5F5; overflow: hidden; }
.language-option { display: flex; align-items: center; justify-content: space-between; padding: 20px 25px; cursor: pointer; transition: all 0.3s; border-bottom: 2px solid #E8F5F5; }
.language-option:last-child { border-bottom: none; }
.language-option:hover { background-color: #E8F5F5; }
.language-option.active { background: linear-gradient(135deg, #E8F5F5 0%, #F0FAFA 100%); }
.language-name { font-size: 18px; font-weight: 600; color: #000000; }
.radio-custom { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #0C9892; position: relative; transition: all 0.3s; }
.radio-custom.selected { background-color: #0C9892; }
.radio-custom.selected::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background-color: #FFFFFF; border-radius: 50%; }
.add-language { background-color: #F5F5F5; }
.add-icon { font-size: 24px; color: #0C9892; font-weight: bold; margin-right: 10px; }

.btn-save { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: #FFFFFF; border: none; border-radius: 30px; padding: 14px 30px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 3px 3px 8px rgba(12, 152, 146, 0.3); display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; }
.btn-save:hover { transform: translateY(-2px); box-shadow: 5px 5px 12px rgba(12, 152, 146, 0.4); }
.btn-cancel { background-color: #FFFFFF; border: 2px solid #E63946; border-radius: 30px; padding: 14px 30px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; color: #E63946; display: inline-flex; align-items: center; gap: 8px; margin-left: 15px; margin-top: 20px; }
.btn-cancel:hover { background-color: #E63946; color: #FFFFFF; transform: translateY(-2px); }
.form-actions { display: flex; gap: 15px; margin-top: 30px; }

.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }

/* Chatbot Modal */
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
  .settings-container { flex-direction: column; } 
  .settings-sidebar { width: 100%; } 
  .form-row { flex-direction: column; align-items: stretch; } 
  .form-row .form-label { min-width: auto; } 
  .alerts-container { flex-direction: column; gap: 25px; } 
  .form-actions { flex-direction: column; } 
  .btn-save, .btn-cancel { width: 100%; justify-content: center; } 
  .robot-wrapper { display: none; } 
}
</style>