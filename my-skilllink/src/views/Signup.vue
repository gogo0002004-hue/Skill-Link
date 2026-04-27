<template>
  <div class="signup-page">
    <div class="logo-header" @click="$router.push('/')">
      <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
    </div>
    
    <div class="signup-container">
      <!-- الشخصية اليسرى -->
      <div class="character left-character">
        <img src="/src/assets/Hidden person-cuate (3).png" alt="Character">
      </div>
      
      <div class="signup-card">
        <h1 class="title">Get started</h1>
        
        <div class="input-group"><input type="text" v-model="form.username" placeholder="Username" class="input-field"></div>
        <div class="input-group"><input type="email" v-model="form.email" placeholder="Email" class="input-field"></div>
        <div class="input-group">
          <input :type="showPass ? 'text' : 'password'" v-model="form.password" placeholder="Password" class="input-field">
          <button type="button" class="toggle-pass" @click="showPass = !showPass">
            <i :class="showPass ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="role" value="student" v-model="form.role" checked>
            <span class="radio-circle"></span> Student
          </label>
          <label class="radio-label">
            <input type="radio" name="role" value="client" v-model="form.role">
            <span class="radio-circle"></span> Client
          </label>
        </div>
        
        <button class="btn-join" @click="handleJoin">Join now</button>
        <div class="divider"></div>
        <p class="login-text">Already have an account? <span @click="$router.push('/login')">Login</span></p>
      </div>
      
      <!-- الشخصية اليمنى -->
      <div class="character right-character">
        <img src="/src/assets/Hidden person-cuate (2).png" alt="Character">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return { 
      form: { username: '', email: '', password: '', role: 'student' }, 
      showPass: false 
    }
  },
  methods: {
    handleJoin() {
      if (!this.form.username || !this.form.email || !this.form.password) {
        alert('Please fill all fields'); 
        return;
      }
      // التوجيه حسب نوع الحساب المختار
      if (this.form.role === 'student') {
        this.$router.push('/signup/step1');
      } else {
        this.$router.push('/client-signup/step1');
      }
    }
  }
}
</script>

<style scoped>
.signup-page { min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); position: relative; overflow: hidden; }
.logo-header { position: absolute; top: 30px; left: 50px; font-size: 32px; font-weight: 700; cursor: pointer; z-index: 30; }
.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; } .logo-killlink { color: #000; }
.signup-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; position: relative; padding: 20px; }

.character { position: absolute; top: 50%; width: 300px; z-index: 10; pointer-events: none; }
.left-character { left: 50%; transform: translate(-240px, -50%); }
.right-character { left: 50%; transform: translate(240px, -50%); }
.character img { width: 100%; height: auto; display: block; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.15)); }

.signup-card { background: white; border-radius: 30px; padding: 50px 60px; box-shadow: 0 15px 50px rgba(0,0,0,0.15); width: 100%; max-width: 500px; text-align: center; position: relative; z-index: 20; }
.title { color: #0C9892; font-size: 32px; font-weight: 700; margin-bottom: 30px; }
.input-group { position: relative; margin-bottom: 20px; }
.input-field { width: 100%; padding: 15px 20px; border: 1px solid #ddd; border-radius: 30px; font-size: 16px; outline: none; transition: 0.3s; }
.input-field:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12, 152, 146, 0.1); }
.toggle-pass { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #666; }

.radio-group { display: flex; justify-content: space-around; margin-bottom: 25px; }
.radio-label { display: flex; align-items: center; cursor: pointer; font-size: 16px; font-weight: 600; color: #333; }
.radio-label input { display: none; }
.radio-circle { width: 20px; height: 20px; border: 2px solid #ccc; border-radius: 50%; margin-right: 8px; position: relative; transition: 0.3s; }
.radio-label input:checked + .radio-circle { border-color: #0C9892; background: #0C9892; }

.btn-join { width: 100%; padding: 16px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(12, 152, 146, 0.3); }
.btn-join:hover { background: #0a827d; transform: translateY(-2px); }
.divider { height: 1px; background: #e0e0e0; margin: 25px 0; }
.login-text { font-size: 15px; color: #555; }
.login-text span { color: #0C9892; cursor: pointer; font-weight: 600; }
@media (max-width: 968px) { .character { display: none; } .signup-card { padding: 40px 30px; } }
</style>