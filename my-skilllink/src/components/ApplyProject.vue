<template>
  <div class="apply-project-page">
    <Navbar />
    <div class="container py-5 px-4">
      <div class="apply-form-container">
        <h1 class="page-title">Apply for project</h1>
        <div class="project-info-section">
          <p class="from-client">From <span class="client-name">{{ project.clientName }}</span></p>
          <div class="info-row"><strong>Project:</strong> {{ project.title }}</div>
          <div class="info-row"><strong>Description:</strong> {{ project.description }}</div>
          <div class="info-row"><strong>Budget:</strong> {{ project.budget }}</div>
          <div class="info-row"><strong>Deadline:</strong> {{ project.deadline }}</div>
          <div class="info-row"><strong>Category:</strong> {{ project.category }}</div>
        </div>
        <form @submit.prevent="submitProposal">
          <div class="form-section"><h2 class="section-title">Your proposal</h2><textarea v-model="formData.proposal" placeholder="Write a brief message explaining why you are suitable for project" class="form-textarea" rows="5" required></textarea></div>
          <div class="form-section"><h2 class="section-title">Delivery time</h2><input type="text" v-model="formData.deliveryTime" placeholder="Within client's deadline" class="form-input"></div>
          <div class="form-section"><h2 class="section-title">Proposal price</h2><input type="text" v-model="formData.price" placeholder="Within client's budget" class="form-input"></div>
          <div class="form-section"><h2 class="section-title">Attach portfolio</h2><input type="text" v-model="formData.portfolio" placeholder="Add relevant work samples" class="form-input"></div>
          <div class="form-section">
            <h2 class="section-title">Terms and conditions</h2>
            <div class="checkbox-group">
              <label class="checkbox-label"><input type="checkbox" v-model="formData.agreeRequirements" required><span>I agree to the project requirements.</span></label>
              <label class="checkbox-label"><input type="checkbox" v-model="formData.agreeBinding" required><span>I understand this is a binding proposal.</span></label>
              <label class="checkbox-label"><input type="checkbox" v-model="formData.agreeTerms" required><span>I agree to SkillLink's terms of service.</span></label>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-submit">Submit a proposal</button>
            <button type="button" @click="cancel" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- ✅ Robot Icon with toggleChatbot -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle"><img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img"></div>
    </div>

    <!-- ✅ Chatbot Modal (New) -->
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
import Navbar from './Navbar.vue'

export default {
  name: 'ApplyProject',
  components: { Navbar },
  data() {
    return {
      // ✅ Chatbot state
      showChatbot: false,
      
      project: { 
        clientName: 'Mohamed Ahmed', 
        title: 'UI/UX Design Needed for Platform', 
        description: 'We need a UI/UX designer to design a clean, easy-to-use interface for our platform.', 
        budget: '$80-$90', 
        deadline: '5 days', 
        category: 'Design & Creative' 
      },
      formData: { 
        proposal: '', 
        deliveryTime: 'Within client\'s deadline', 
        price: 'Within client\'s budget', 
        portfolio: '', 
        agreeRequirements: false, 
        agreeBinding: false, 
        agreeTerms: false 
      }
    }
  },
  methods: {
    // ✅ Chatbot methods
    toggleChatbot() { 
      this.showChatbot = !this.showChatbot; 
    },
    closeChatbot() { 
      this.showChatbot = false; 
    },
    
    submitProposal() { 
      if (this.formData.agreeRequirements && this.formData.agreeBinding && this.formData.agreeTerms) { 
        alert('Your proposal has been submitted successfully!'); 
        this.$router.push('/'); 
      } else { 
        alert('Please agree to all terms and conditions.'); 
      } 
    },
    cancel() { 
      this.$router.push('/'); 
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.apply-project-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
.page-title { font-size: 32px; font-weight: 700; color: #000000; margin-bottom: 20px; }
.apply-form-container { max-width: 900px; margin: 0 auto; }
.project-info-section { background-color: #FFFFFF; border-radius: 20px; padding: 30px; box-shadow: 3px 3px 6px rgba(0,0,0,0.1); margin-bottom: 30px; }
.from-client { font-size: 18px; margin-bottom: 20px; }
.client-name { color: #0C9892; font-weight: 700; }
.info-row { font-size: 17px; color: #333; margin-bottom: 10px; line-height: 1.6; }
.info-row strong { color: #000000; }
.form-section { margin-bottom: 25px; }
.section-title { font-size: 22px; font-weight: 700; color: #000000; margin-bottom: 15px; }
.form-textarea, .form-input { width: 100%; padding: 14px 20px; border: 1px solid #CCCCCC; border-radius: 20px; font-size: 16px; outline: none; transition: all 0.3s; background-color: #FFFFFF; }
.form-textarea:focus, .form-input:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12, 152, 146, 0.1); }
.form-textarea { resize: vertical; font-family: 'Lato', sans-serif; }
.form-input::placeholder, .form-textarea::placeholder { color: #CCCCCC; }
.checkbox-group { display: flex; flex-direction: column; gap: 15px; }
.checkbox-label { display: flex; align-items: center; gap: 12px; cursor: pointer; font-size: 16px; color: #333; }
.checkbox-label input[type="checkbox"] { width: 20px; height: 20px; cursor: pointer; accent-color: #0C9892; }
.form-actions { display: flex; gap: 15px; justify-content: flex-end; margin-top: 30px; }
.btn-submit, .btn-cancel { padding: 14px 40px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; }
.btn-submit { background-color: #0C9892; color: #FFFFFF; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); }
.btn-submit:hover { background-color: #0a827d; transform: translateY(-2px); box-shadow: 4px 4px 8px rgba(0,0,0,0.2); }
.btn-cancel { background-color: #FFFFFF; border: 1px solid #000000; color: #000000; }
.btn-cancel:hover { background-color: #F5F5F5; }

/* Robot Icon */
.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }

/* ✅ Chatbot Modal Styles */
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

@media (max-width: 768px) { 
  .robot-wrapper { display: none; } 
  .apply-form-container { padding: 0 20px; } 
  .form-actions { flex-direction: column; } 
  .btn-submit, .btn-cancel { width: 100%; } 
}
</style>