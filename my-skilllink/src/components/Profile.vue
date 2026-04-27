<template>
  <div class="profile-page">
    <Navbar />
    <div class="profile-container">
      <div class="profile-sidebar">
        <div class="sidebar-profile-pic"><img src="/src/assets/Headshot profile.jpg" alt="Profile" class="sidebar-profile-img"></div>
        <div class="sidebar-section">
          <h3 class="sidebar-title">Contact</h3>
          <div class="contact-item"><i class="fas fa-phone"></i><span>+20 1001234567</span></div>
          <div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>Cairo, Egypt</span></div>
          <div class="contact-item"><i class="fas fa-envelope"></i><span>ahmed.mohamed@gmail.com</span></div>
        </div>
      </div>
      <div class="profile-main">
        <div class="profile-header">
          <h1 class="profile-name">Ahmed Mohamed</h1>
          <p class="profile-title">UI/UX Designer & Frontend Developer</p>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-behance"></i></a>
          </div>
        </div>
        <div class="profile-section">
          <h2 class="section-title">About</h2>
          <p class="about-text">Passionate UI/UX designer with 3 years of experience creating intuitive and visually stunning digital products.</p>
        </div>
        <div class="profile-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid">
            <span class="skill-badge">Figma</span><span class="skill-badge">Adobe XD</span><span class="skill-badge">HTML/CSS</span><span class="skill-badge">Vue.js</span><span class="skill-badge">User Research</span>
          </div>
        </div>
        <div class="profile-section">
          <div class="section-header"><h2 class="section-title">Reviews</h2><a href="#" class="show-more">Show more »</a></div>
          <div class="reviews-summary">
            <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <span class="rating">4.8</span><span class="reviews-count">(12 Reviews)</span>
          </div>
          <div class="reviews-grid">
            <div class="review-item">"Excellent attention to detail and fast delivery."</div>
            <div class="review-item">"Very professional and easy to communicate with."</div>
            <div class="review-item">"Great design skills, highly recommended!"</div>
            <div class="review-item">"Understood requirements perfectly and delivered on time."</div>
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
        <div class="chatbot-header">
          <h3>SkillLink Chatbot</h3>
          <button class="close-chatbot" @click="closeChatbot"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-body">
          <iframe src="https://graduation-chatbot-project--toqamohsen592.replit.app" frameborder="0" class="chatbot-iframe"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'Profile',
  components: { Navbar },
  data() {
    return { showChatbot: false }
  },
  methods: {
    toggleChatbot() { this.showChatbot = !this.showChatbot; },
    closeChatbot() { this.showChatbot = false; }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.profile-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
.profile-container { display: flex; max-width: 1200px; margin: 40px auto; background-color: #FFFFFF; border-radius: 0; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); border: 2px solid #0C9892; }
.profile-sidebar { width: 350px; background: linear-gradient(180deg, #0C9892 0%, #0A827D 100%); padding: 40px 30px; color: #FFFFFF; flex-shrink: 0; }
.sidebar-profile-pic { text-align: center; margin-bottom: 35px; }
.sidebar-profile-img { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; border: 5px solid rgba(255,255,255,0.3); }
.sidebar-section { margin-bottom: 35px; padding-bottom: 35px; border-bottom: 1px solid rgba(255,255,255,0.3); }
.sidebar-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #FFFFFF; }
.contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; font-size: 15px; }
.contact-item i { width: 20px; color: rgba(255,255,255,0.8); }
.profile-main { flex: 1; padding: 50px; background-color: #FFFFFF; }
.profile-header { margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #E0E0E0; }
.profile-name { font-size: 42px; font-weight: 700; color: #000000; margin: 0 0 10px 0; }
.profile-title { font-size: 22px; color: #666; margin: 0 0 20px 0; }
.social-icons { display: flex; gap: 15px; }
.social-icon { width: 40px; height: 40px; background-color: #000000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 18px; transition: all 0.3s; }
.social-icon:hover { background-color: #0C9892; transform: translateY(-3px); }
.profile-section { margin-bottom: 45px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.section-title { font-size: 32px; font-weight: 700; color: #000000; margin: 0; }
.show-more { color: #0C9892; font-size: 16px; font-weight: 600; text-decoration: none; }
.about-text { font-size: 17px; line-height: 1.8; color: #333; margin: 0; }
.skills-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.skill-badge { background: linear-gradient(135deg, #E8F5F5 0%, #F0FAFA 100%); border: 2px solid #0C9892; border-radius: 25px; padding: 10px 18px; font-size: 15px; color: #0C9892; font-weight: 600; }
.reviews-summary { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.stars { color: #FFD700; font-size: 24px; }
.rating { font-size: 24px; font-weight: 700; color: #000000; }
.reviews-count { font-size: 16px; color: #666; }
.reviews-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.review-item { background-color: #F8F8F8; padding: 20px; border-radius: 15px; font-size: 15px; color: #333; line-height: 1.6; border: 1px solid #E0E0E0; }
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
@media (max-width: 1024px) { .profile-container { flex-direction: column; } .profile-sidebar { width: 100%; } .profile-main { padding: 30px; } }
@media (max-width: 768px) { .profile-name { font-size: 32px; } .reviews-grid { grid-template-columns: 1fr; } .robot-wrapper { display: none; } }
</style>                                                                                                                                                                           دى صفحة ال Profile.vue