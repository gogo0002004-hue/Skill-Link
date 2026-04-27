<template>
  <div class="landing-page">
    
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
        </div>
        
        <div class="nav-links">
          <a @click="scrollToSection('hero')" :class="{ active: activeSection === 'hero' }">Home</a>
          <a @click="scrollToSection('marketplaces')" :class="{ active: activeSection === 'marketplaces' }">Explore</a>
          <a @click="scrollToSection('key-features')" :class="{ active: activeSection === 'key-features' }">Key features</a>
          <a @click="scrollToSection('how-it-works')" :class="{ active: activeSection === 'how-it-works' }">How it works</a>
        </div>
        
        <div class="nav-buttons">
          <button class="btn-login" @click="$router.push('/login')">Login</button>
          <button class="btn-signup" @click="$router.push('/signup')">Sign up</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">The Best Freelancing Platform for <span class="highlight">Students</span></h1>
          <p class="hero-description">SkillLink connects students from different fields with clients looking for freelance services</p>
          <div class="hero-buttons">
            <button class="btn-hero-primary">Hire freelancers</button>
            <button class="btn-hero-secondary">Find work</button>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <div class="hero-circle"></div>
          <img src="/src/assets/student girl.png" alt="Student" class="hero-image">
          <div class="hero-dots dots-left"></div>
          <div class="hero-dots dots-right"></div>
        </div>
      </div>
      
      <div class="info-banner">
        <p>Need a task done? Find talented students offering affordable, high-quality services. <a href="#" class="join-link">Join as a client</a></p>
      </div>
    </section>

    <!-- Explore Marketplaces Section -->
    <section id="marketplaces" class="marketplaces-section">
      <div class="section-container">
        <div class="section-line"></div>
        <h2 class="section-title">Explore the marketplaces</h2>
        
        <div class="marketplace-grid">
          <div class="marketplace-card"><img src="/src/assets/Programming Technology.png" alt="Programming" class="card-icon"><h3>Programming & Technology</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Design Creative.png" alt="Design" class="card-icon"><h3>Design & Creative</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Writing Translation.png" alt="Writing" class="card-icon"><h3>Writing & Translation</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Marketing Sales.png" alt="Marketing" class="card-icon"><h3>Marketing & Sales</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Support Administration.png" alt="Support" class="card-icon"><h3>Support & Administration</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Audio Video.png" alt="Audio" class="card-icon"><h3>Audio & Video</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Business Finance.png" alt="Business" class="card-icon"><h3>Business & Finance</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Education Training.png" alt="Education" class="card-icon"><h3>Education & Training</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Legal.png" alt="Legal" class="card-icon"><h3>Legal</h3></div>
          <div class="marketplace-card"><img src="/src/assets/Engineering Architecture.png" alt="Engineering" class="card-icon"><h3>Engineering & Architecture</h3></div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works-section">
      <div class="section-container">
        <div class="section-line"></div>
        <div class="how-header">
          <h2 class="section-title">How it works</h2>
          <div class="toggle-buttons">
            <button :class="{ active: showStudentsView }" @click="showStudentsView = true">For Students</button>
            <button :class="{ active: !showStudentsView }" @click="showStudentsView = false">For Clients</button>
          </div>
        </div>
        
        <div v-if="showStudentsView" class="steps-container">
          <div class="step-card"><img src="/src/assets/icons8-profile-96 (1).png" alt="Profile" class="step-icon"><h3>Create your profile</h3></div>
          <div class="step-card"><img src="/src/assets/icons8-target-100 (1).png" alt="Matched" class="step-icon"><h3>Get matched with projects</h3></div>
          <div class="step-card"><img src="/src/assets/icons8-bribery-100 (1).png" alt="Payment" class="step-icon"><h3>Secure Delivery & Payment</h3></div>
        </div>
        
        <div v-else class="steps-container">
          <div class="step-card"><i class="fas fa-file-signature step-icon-fa"></i><h3>Describe Your Needs</h3></div>
          <div class="step-card"><i class="fas fa-users step-icon-fa"></i><h3>Compare Best Talent</h3></div>
          <div class="step-card"><i class="fas fa-user-shield step-icon-fa"></i><h3>Hire Securely</h3></div>
        </div>
      </div>
    </section>

    <!-- Key Features Section -->
    <section id="key-features" class="key-features-section">
      <div class="section-container">
        <div class="section-line"></div>
        <h2 class="section-title">SkillLink key features</h2>
        
        <div class="features-grid">
          <div class="features-left">
            <div class="feature-card large">
              <div class="card-normal-content"><img src="/src/assets/Knowledge.png" alt="Built for Students" class="feature-image"><h3>Built for Students</h3></div>
              <div class="card-hover-content"><h3>Built for Students</h3><p>A freelancing platform designed especially for students — simple, supportive and easy to start.</p></div>
            </div>
            <div class="feature-card">
              <div class="card-normal-content"><img src="/src/assets/Cyber attack.png" alt="Secure Payment" class="feature-image"><h3>Secure Payment System</h3></div>
              <div class="card-hover-content"><h3>Secure Payment System</h3><p>Safe and reliable payments — funds are protected and released only when the project is successfully approved.</p></div>
            </div>
          </div>
          
          <div class="features-right">
            <div class="feature-card right-layout">
               <div class="card-normal-content"><div class="text-side"><h3>Real Projects, Real Experience</h3></div><img src="/src/assets/Agreement.png" alt="Real Projects" class="feature-image-side"></div>
               <div class="card-hover-content"><h3>Real Projects, Real Experience</h3><p>Gain hands-on experience by working on real projects and building your portfolio while studying.</p></div>
            </div>
            <div class="feature-card right-layout">
               <div class="card-normal-content"><div class="text-side"><h3>Save Time, Learn Remotely</h3></div><img src="/src/assets/Work time.png" alt="Save Time" class="feature-image-side"></div>
               <div class="card-hover-content"><h3>Save Time, Learn Remotely</h3><p>Get real-world experience without the need to travel for internships — work from anywhere and build your skills online.</p></div>
            </div>
            <div class="feature-card right-layout">
               <div class="card-normal-content"><div class="text-side"><h3>Chatbot — Always Here to Help</h3></div><img src="/src/assets/Chat bot pana.png" alt="Chatbot" class="feature-image-side"></div>
               <div class="card-hover-content"><h3>Chatbot — Always Here to Help</h3><p>Get instant guidance and support anytime — whether you need help finding the right projects, setting up your profile, or navigating the platform.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <div class="cta-content">
          <h2>Start your first project today</h2>
          <p>Join thousands of students building real experience</p>
        </div>
        <button class="btn-cta">Get started ›</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-top-line"></div>
      <div class="footer-container">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
          </div>
          <p class="brand-description">A student-focused freelance platform for real projects and real experience</p>
          <div class="social-icons">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-linkedin-in"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-github"></i>
            <i class="fas fa-envelope"></i>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-col">
            <h4>Quick links</h4>
            <a @click="scrollToSection('hero')">Home</a>
            <a @click="scrollToSection('marketplaces')">Explore Categories</a>
            <a @click="scrollToSection('how-it-works')">How It Works</a>
            <a @click="scrollToSection('key-features')">Key Features</a>
            <a>Chatbot</a>
          </div>
          
          <div class="footer-categories">
            <div class="categories-col">
              <h4>Categories</h4>
              <a>Programming & technology</a>
              <a>Design & Creative</a>
              <a>Writing & Translation</a>
              <a>Marketing & Sales</a>
              <a>Support & Administration</a>
            </div>
            <div class="categories-col">
              <a>Audio & Video</a>
              <a>Business & Finance</a>
              <a>Education & Training</a>
              <a>Legal</a>
              <a>Engineering & Architecture</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2025 Student Freelance Platform — Made for Students</p>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return { activeSection: 'hero', showStudentsView: true }
  },
  mounted() { window.addEventListener('scroll', this.handleScroll); },
  beforeUnmount() { window.removeEventListener('scroll', this.handleScroll); },
  methods: {
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); this.activeSection = id; }
    },
    handleScroll() {
      const sections = ['hero', 'marketplaces', 'how-it-works', 'key-features'];
      const pos = window.scrollY + 150;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) { this.activeSection = sec; break; }
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lato:wght@400;600;700;800&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Lato', sans-serif; }
.landing-page { background-color: #FAFAFA; overflow-x: hidden; color: #333; }

/* ===== Navigation ===== */
.navbar { background: #FFFFFF; padding: 25px 0; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.nav-container { max-width: 1500px; margin: 0 auto; padding: 0 60px; display: flex; align-items: center; }
.logo { display: flex; align-items: center; cursor: pointer; margin-right: 80px; flex-shrink: 0; }
.logo-s { font-family: 'Dancing Script', cursive; color: #0C9892; font-size: 56px; font-weight: 700; line-height: 1; margin-right: 3px; }
.logo-killlink { color: #000000; font-size: 28px; font-weight: 700; line-height: 1; }
.nav-links { display: flex; gap: 35px; margin-right: auto; }
.nav-links a { color: #333; text-decoration: none; font-weight: 600; font-size: 17px; cursor: pointer; transition: color 0.3s; white-space: nowrap; }
.nav-links a:hover, .nav-links a.active { color: #0C9892; }
.nav-buttons { display: flex; gap: 18px; flex-shrink: 0; }
.btn-login, .btn-signup { padding: 14px 36px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; font-size: 16px; }
.btn-login { background: white; border: 2px solid #0C9892; color: #0C9892; }
.btn-login:hover { background: #0C9892; color: white; }
.btn-signup { background: #0C9892; color: white; }
.btn-signup:hover { background: #0a827d; transform: translateY(-2px); }

/* ===== Hero Section ===== */
.hero-section { padding: 100px 20px 70px; background: #FFFFFF; }
.hero-container { max-width: 1450px; margin: 0 auto; display: flex; align-items: center; gap: 100px; }
.hero-content { flex: 1; }
.hero-title { font-size: 62px; font-weight: 800; line-height: 1.15; margin-bottom: 28px; color: #000; }
.highlight { color: #0C9892; }
.hero-description { font-size: 22px; color: #555; margin-bottom: 45px; line-height: 1.6; max-width: 560px; }
.hero-buttons { display: flex; gap: 25px; }
.btn-hero-primary, .btn-hero-secondary { padding: 18px 42px; border-radius: 35px; font-weight: 700; cursor: pointer; transition: all 0.3s; border: none; font-size: 18px; }
.btn-hero-primary { background: #0C9892; color: white; box-shadow: 0 4px 15px rgba(12, 152, 146, 0.3); }
.btn-hero-primary:hover { background: #0a827d; transform: translateY(-3px); }
.btn-hero-secondary { background: white; color: #333; border: 2px solid #ddd; }
.btn-hero-secondary:hover { border-color: #0C9892; color: #0C9892; }
.hero-image-wrapper { flex: 1; position: relative; display: flex; justify-content: center; align-items: center; min-height: 620px; }
.hero-circle { position: absolute; width: 560px; height: 560px; background: #0C9892; border-radius: 50%; z-index: 0; }
.hero-image { position: relative; z-index: 1; max-width: 100%; height: auto; max-height: 620px; object-fit: contain; }
.hero-dots { position: absolute; width: 150px; height: 150px; background-image: radial-gradient(#0C9892 4px, transparent 4px); background-size: 24px 24px; opacity: 0.4; z-index: 2; }
.dots-left { top: 45px; left: 45px; }
.dots-right { bottom: 45px; right: 45px; }
.info-banner { max-width: 1450px; margin: 70px auto 0; padding: 35px 80px; background: white; border-radius: 20px; border: 1px solid #e0e0e0; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
.info-banner p { margin: 0; color: #333; font-size: 24px; font-weight: 500; line-height: 1.5; }
.join-link { color: #0C9892; text-decoration: none; font-weight: 700; }
.join-link:hover { text-decoration: underline; }

/* ===== Sections Common ===== */
.section-container { max-width: 1450px; margin: 0 auto; padding: 110px 20px; }
.section-line { width: 90px; height: 5px; background: #0C9892; margin-bottom: 28px; border-radius: 5px; }
.section-title { font-size: 42px; font-weight: 800; color: #000; margin-bottom: 70px; }

/* ===== Marketplaces ===== */
.marketplaces-section { background: #FAFAFA; }
.marketplace-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 30px; }
.marketplace-card { background: white; border: 1px solid #e0e0e0; border-radius: 26px; padding: 42px 26px; text-align: center; cursor: pointer; transition: all 0.3s; }
.marketplace-card:hover { border-color: #0C9892; transform: translateY(-8px); box-shadow: 0 12px 25px rgba(12, 152, 146, 0.15); }
.marketplace-card:hover .card-icon, .marketplace-card:hover h3 { filter: brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(435%) hue-rotate(138deg) brightness(92%) contrast(92%); }
.card-icon { width: 80px; height: 80px; margin-bottom: 24px; transition: all 0.3s; object-fit: contain; }
.marketplace-card h3 { font-size: 17px; font-weight: 700; color: #333; transition: all 0.3s; }

/* ===== How It Works ===== */
.how-it-works-section { background: #FFFFFF; }
.how-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 70px; }
.toggle-buttons { display: flex; background: #E8F5F5; border-radius: 35px; padding: 6px; }
.toggle-buttons button { padding: 17px 40px; border: none; background: transparent; border-radius: 30px; font-weight: 700; cursor: pointer; transition: all 0.3s; color: #666; font-size: 16px; }
.toggle-buttons button.active { background: #0C9892; color: white; box-shadow: 0 4px 10px rgba(12, 152, 146, 0.2); }
.steps-container { display: flex; gap: 38px; }
.step-card { flex: 1; background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); border-radius: 28px; padding: 75px 32px; text-align: center; color: white; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.step-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(12, 152, 146, 0.3); }
.step-icon { width: 110px; height: 110px; margin-bottom: 30px; filter: brightness(0) invert(1); object-fit: contain; }
.step-icon-fa { font-size: 90px; color: #ffffff; margin-bottom: 30px; opacity: 1; display: block; line-height: 1; }
.step-card h3 { font-size: 25px; font-weight: 700; line-height: 1.3; }

/* ===== Key Features ===== */
.key-features-section { background: #FAFAFA; }
.features-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 38px; }
.features-left, .features-right { display: flex; flex-direction: column; gap: 38px; }
.feature-card { background: white; border: 1px solid #e0e0e0; border-radius: 28px; padding: 75px 65px; transition: all 0.4s ease; position: relative; overflow: hidden; cursor: pointer; min-height: 420px; display: flex; align-items: center; justify-content: center; }
.feature-card.large { flex: 1.2; min-height: 580px; }
.feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-color: #0C9892; }
.card-normal-content { text-align: center; width: 100%; transition: all 0.4s ease; }
.feature-card.right-layout .card-normal-content { display: flex; justify-content: space-between; align-items: center; text-align: left; gap: 60px; }
.feature-image { max-height: 420px; object-fit: contain; margin-bottom: 40px; transition: all 0.4s ease; }
.feature-card.right-layout .feature-image-side { width: 300px; height: 300px; object-fit: contain; margin-left: 20px; transition: all 0.4s ease; }
.card-normal-content h3 { font-size: 36px; font-weight: 800; color: #0C9892; transition: all 0.4s ease; }
.card-hover-content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px; opacity: 0; pointer-events: none; transition: all 0.4s ease; z-index: 5; }
.card-hover-content h3 { font-size: 40px; font-weight: 800; color: #000; margin-bottom: 28px; }
.card-hover-content p { font-size: 24px; color: #444; line-height: 1.7; font-weight: 500; }
.feature-card:hover .card-normal-content { filter: blur(8px); opacity: 0.2; transform: scale(1.05); }
.feature-card:hover .card-hover-content { opacity: 1; pointer-events: auto; }

/* ===== CTA Section ===== */
.cta-section { padding: 110px 20px; background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); }
.cta-container { max-width: 1450px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.cta-content h2 { font-size: 44px; color: white; margin-bottom: 14px; font-weight: 800; }
.cta-content p { font-size: 22px; color: rgba(255,255,255,0.9); }
.btn-cta { padding: 24px 60px; background: white; color: #0C9892; border: none; border-radius: 35px; font-weight: 800; font-size: 21px; cursor: pointer; transition: all 0.3s; }
.btn-cta:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }

/* ===== Footer ===== */
.footer { background: #FFFFFF; padding: 80px 20px 30px; }
.footer-top-line { max-width: 1450px; margin: 0 auto 60px; border-top: 1px solid #000; }
.footer-container { max-width: 1450px; margin: 0 auto; display: flex; justify-content: space-between; gap: 80px; align-items: flex-start; }
.footer-brand { flex: 1; max-width: 380px; }
.footer-brand .logo { margin-bottom: 20px; margin-right: 0; }
.brand-description { color: #333; font-size: 15px; line-height: 1.6; margin-bottom: 25px; }
.social-icons { display: flex; gap: 18px; }
.social-icons i { font-size: 20px; color: #000; cursor: pointer; transition: all 0.3s; }
.social-icons i:hover { color: #0C9892; }
.footer-links { display: flex; gap: 100px; flex: 1; }
.footer-col h4 { font-size: 16px; font-weight: 700; margin-bottom: 25px; color: #000; }
.footer-col a { display: block; color: #333; text-decoration: none; font-size: 15px; margin-bottom: 16px; transition: color 0.3s; cursor: pointer; }
.footer-col a:hover { color: #0C9892; }
.footer-categories { display: flex; gap: 80px; }
.categories-col h4 { font-size: 16px; font-weight: 700; margin-bottom: 25px; color: #000; }
.categories-col a { display: block; color: #333; text-decoration: none; font-size: 15px; margin-bottom: 16px; transition: color 0.3s; cursor: pointer; }
.categories-col a:hover { color: #0C9892; }
.footer-bottom { max-width: 1450px; margin: 60px auto 0; padding-top: 25px; text-align: center; }
.footer-bottom p { color: #666; font-size: 14px; }

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .marketplace-grid { grid-template-columns: repeat(3, 1fr); }
  .features-grid { grid-template-columns: 1fr; }
  .hero-container { flex-direction: column; text-align: center; }
  .hero-buttons { justify-content: center; }
  .hero-description { margin: 0 auto 45px; }
  .nav-container { padding: 0 40px; }
  .nav-links { gap: 25px; }
  .feature-card.right-layout .card-normal-content { flex-direction: column; text-align: center; gap: 30px; }
  .feature-card.right-layout .feature-image-side { margin: 0 0 25px 0; width: 220px; height: 220px; }
  .footer-container { flex-direction: column; gap: 50px; }
  .footer-links { flex-direction: column; gap: 40px; }
  .footer-categories { flex-direction: column; gap: 30px; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .marketplace-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-container { flex-direction: column; }
  .how-header { flex-direction: column; gap: 28px; align-items: flex-start; }
  .cta-container { flex-direction: column; text-align: center; gap: 35px; }
  .hero-title { font-size: 46px; }
  .hero-circle { width: 420px; height: 420px; }
}
</style>