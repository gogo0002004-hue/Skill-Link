<template>
  <div class="freelancer-profile-page">
    <ClientNavbar />
    
    <div class="profile-container">
      <div class="profile-sidebar">
        <div class="sidebar-profile-pic">
          <img :src="freelancer.avatar || '/src/assets/default-avatar.png'" :alt="freelancer.name" class="sidebar-profile-img">
        </div>
        
        <div class="sidebar-section">
          <h3 class="sidebar-title">Contact</h3>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>{{ freelancer.email || 'Not provided' }}</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ freelancer.location || 'Not provided' }}</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-calendar"></i>
            <span>Member since {{ freelancer.joined || '2024' }}</span>
          </div>
        </div>
        <!-- ✅ تم إزالة زر الشات من هنا -->
      </div>
      
      <div class="profile-main">
        <div class="profile-header">
          <h1 class="profile-name">{{ freelancer.full_name }}</h1>
          <p class="profile-title">{{ freelancer.title }}</p>
          <div class="social-icons">
            <a v-if="freelancer.socials?.linkedin" :href="freelancer.socials.linkedin" target="_blank" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a v-if="freelancer.socials?.github" :href="freelancer.socials.github" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
            <a v-if="freelancer.socials?.behance" :href="freelancer.socials.behance" target="_blank" class="social-icon"><i class="fab fa-behance"></i></a>
            <a v-if="freelancer.socials?.website" :href="freelancer.socials.website" target="_blank" class="social-icon"><i class="fas fa-globe"></i></a>
          </div>
        </div>
        
        <div class="profile-section">
          <h2 class="section-title">About</h2>
          <p class="about-text">{{ freelancer.bio }}</p>
        </div>
        
        <div class="profile-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-grid">
            <span v-for="(skill, index) in freelancer.skills" :key="index" class="skill-badge">{{ skill }}</span>
          </div>
        </div>
        
        <div class="profile-section">
          <h2 class="section-title">Portfolio</h2>
          <div class="portfolio-grid">
            <div v-for="(item, index) in freelancer.portfolio" :key="index" class="portfolio-item">
              <img :src="item.image" :alt="item.title" class="portfolio-img">
              <p class="portfolio-title">{{ item.title }}</p>
            </div>
          </div>
        </div>
        
        <div class="profile-section">
          <div class="section-header">
            <h2 class="section-title">Reviews</h2>
            <a href="#" class="show-more">Show more »</a>
          </div>
          <div class="reviews-summary">
            <div class="stars">
              <i v-for="n in 5" :key="n" :class="n <= Math.round(freelancer.rating) ? 'fas fa-star' : 'far fa-star'"></i>
            </div>
            <span class="rating">{{ freelancer.rating }}</span>
            <span class="reviews-count">({{ freelancer.review_count }} Reviews)</span>
          </div>
          <div class="reviews-grid">
            <div v-for="(review, i) in freelancer.reviews" :key="i" class="review-item">
              <p>"{{ review.text }}"</p>
              <span class="review-author">- {{ review.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Robot Icon & Chatbot Modal (زي ما هو شغال في باقي الصفحات) -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle"><img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img"></div>
    </div>

    <div v-if="showChatbot" class="chatbot-modal" @click.self="closeChatbot">
      <div class="chatbot-container">
        <div class="chatbot-header">
          <h3>SkillLink Chatbot</h3>
          <button class="close-chatbot" @click="closeChatbot"><i class="fas fa-times"></i></button>
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
import ClientNavbar from './ClientNavbar.vue'

// 📦 قاعدة بيانات وهمية للفريلانسرز (هتستبدلها بالـ API لما الـ Backend يشتغل)
const freelancersDB = {
  'salma-mustafa': {
    name: 'Salma Mustafa',
    full_name: 'Salma Mustafa',
    title: 'UI/UX Designer & Frontend Developer',
    email: 'salma.mustafa@email.com',
    location: 'Cairo, Egypt',
    bio: 'Passionate UI/UX designer with 3 years of experience creating intuitive and visually stunning digital products. I specialize in user research, wireframing, prototyping, and front-end development.',
    avatar: '/src/assets/pexels kaplanart.jpg',
    skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'HTML/CSS', 'Vue.js', 'Prototyping'],
    portfolio: [
      { title: 'E-commerce Dashboard', image: '/src/assets/portfolio1.png' },
      { title: 'Mobile Banking App', image: '/src/assets/portfolio2.png' },
      { title: 'Social Media Platform', image: '/src/assets/portfolio3.png' }
    ],
    rating: 4.8,
    review_count: 24,
    joined: 'January 2024',
    socials: { linkedin: '#', behance: '#' },
    reviews: [
      { text: 'Great work, delivered on time!', author: 'Ahmed K.' },
      { text: 'Very professional and easy to communicate with.', author: 'Mariam S.' },
      { text: 'Highly recommended! Amazing attention to detail.', author: 'Omar T.' }
    ]
  },
  'mohamed-osama': {
    name: 'Mohamed Osama',
    full_name: 'Mohamed Osama',
    title: 'Full Stack Developer & Cloud Architect',
    email: 'm.osama@techdev.com',
    location: 'Alexandria, Egypt',
    bio: 'Experienced full-stack developer specializing in scalable web applications and cloud infrastructure. I love solving complex problems and building efficient systems.',
    avatar: '/src/assets/pexels italo.jpg',
    skills: ['Node.js', 'React', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'CI/CD'],
    portfolio: [
      { title: 'SaaS Analytics Platform', image: '/src/assets/portfolio4.png' },
      { title: 'Real-time Chat App', image: '/src/assets/portfolio5.png' }
    ],
    rating: 4.9,
    review_count: 31,
    joined: 'March 2023',
    socials: { github: '#', linkedin: '#' },
    reviews: [
      { text: 'Exceptional coding standards and fast delivery.', author: 'Nour A.' },
      { text: 'Fixed our backend issues in hours!', author: 'Hassan M.' }
    ]
  },
  'nora-fahmy': {
    name: 'Nora Fahmy',
    full_name: 'Nora Fahmy',
    title: 'Digital Marketing & SEO Specialist',
    email: 'nora.f@marketingpro.com',
    location: 'Giza, Egypt',
    bio: 'Digital marketing strategist with a proven track record in SEO, content marketing, and social media growth. I help brands reach their target audience effectively.',
    avatar: '/src/assets/pexels sadiq.jpg',
    skills: ['SEO', 'Google Ads', 'Content Strategy', 'Analytics', 'Social Media', 'Email Marketing'],
    portfolio: [
      { title: 'E-commerce SEO Campaign', image: '/src/assets/portfolio6.png' },
      { title: 'Brand Awareness Strategy', image: '/src/assets/portfolio7.png' }
    ],
    rating: 4.7,
    review_count: 18,
    joined: 'June 2023',
    socials: { linkedin: '#', website: '#' },
    reviews: [
      { text: 'Increased our organic traffic by 150%!', author: 'Tarek I.' },
      { text: 'Very strategic and data-driven approach.', author: 'Laila S.' }
    ]
  }
}

export default {
  name: 'FreelancerProfile',
  components: { ClientNavbar },
  data() {
    return {
      showChatbot: false,
      freelancer: {} // هيتعبا ديناميكياً بناءً على الرابط
    }
  },
  watch: {
    // مراقبة تغيير الـ Route عشان تحمل بيانات الفريلانسر الجديد
    '$route.params.slug': {
      handler(newSlug) {
        this.loadFreelancer(newSlug || this.$route.params.name)
      },
      immediate: true
    }
  },
  methods: {
    loadFreelancer(slug) {
      // لو الـ slug موجود في الداتا بيز، اعرضه. غير كده اعرض داتا افتراضية
      this.freelancer = freelancersDB[slug] || freelancersDB['salma-mustafa']
      
      // 🔄 لما الـ Backend يشتغل، هتحطي الكود ده مكان السطر اللي فوق:
      // this.fetchFreelancerFromAPI(slug)
    },
    
    // 🔮 مثال لربط الـ Backend مستقبلاً
    // async fetchFreelancerFromAPI(slug) {
    //   try {
    //     const res = await userAPI.getPublicProfile(slug)
    //     this.freelancer = res.data.data
    //   } catch (err) {
    //     console.error(err)
    //   }
    // },
    
    toggleChatbot() { this.showChatbot = !this.showChatbot },
    closeChatbot() { this.showChatbot = false }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.freelancer-profile-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
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
.portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.portfolio-item { background: #F9F9F9; border-radius: 15px; overflow: hidden; transition: transform 0.2s; }
.portfolio-item:hover { transform: translateY(-3px); }
.portfolio-img { width: 100%; height: 150px; object-fit: cover; }
.portfolio-title { padding: 12px; font-size: 14px; color: #333; text-align: center; }
.reviews-summary { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.stars { color: #FFD700; font-size: 24px; }
.rating { font-size: 24px; font-weight: 700; color: #000000; }
.reviews-count { font-size: 16px; color: #666; }
.reviews-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.review-item { background-color: #F8F8F8; padding: 20px; border-radius: 15px; font-size: 15px; color: #333; line-height: 1.6; border: 1px solid #E0E0E0; }
.review-author { display: block; margin-top: 10px; font-size: 13px; color: #666; font-style: italic; }

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

@media (max-width: 1024px) { .profile-container { flex-direction: column; } .profile-sidebar { width: 100%; } .profile-main { padding: 30px; } }
@media (max-width: 768px) { .profile-name { font-size: 32px; } .reviews-grid { grid-template-columns: 1fr; } .robot-wrapper { display: none; } }
</style>