<template>
  <div class="login-page">
    <div class="logo-header" @click="$router.push('/')">
      <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
    </div>
    
    <div class="login-container">
      <!-- الشخصية اليسرى -->
      <div class="character left-character">
        <img src="/src/assets/Hidden person-cuate (3).png" alt="Character">
      </div>
      
      <div class="login-card">
        <h1 class="welcome-title">Welcome back!</h1>
        
        <div class="input-group">
          <input type="email" v-model="formData.email" placeholder="Email" class="input-field">
        </div>
        
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" placeholder="Password" class="input-field">
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        
        <div class="forgot-password" @click="goToForgotPassword">
          Forgotten password?
        </div>
        
        <button class="btn-login" @click="handleLogin">Login</button>
        
        <div class="divider"></div>
        
        <div class="create-account">
          Don't have an account? <span class="create-link" @click="goToSignup">Create one</span>
        </div>
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
  name: 'Login',
  data() {
    return {
      formData: { email: '', password: '' },
      showPassword: false
    }
  },
  methods: {
    goToForgotPassword() { this.$router.push('/forgot-password'); },
    goToSignup() { this.$router.push('/signup'); },
    handleLogin() {
      if (!this.formData.email || !this.formData.password) {
        alert('Please enter email and password');
        return;
      }
      alert('Login functionality coming soon!');
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.logo-header {
  position: absolute;
  top: 30px;
  left: 50px;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
  z-index: 30;
}

.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; }
.logo-killlink { color: #000; }

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding: 20px;
}

/* === تنسيق الشخصيات === */
.character {
  position: absolute;
  top: 50%;
  width: 300px;
  z-index: 20;
  pointer-events: none;
}

.left-character {
  right: 50%;
  transform: translate(-38px, -50%);
}

.right-character {
  left: 50%;
  transform: translate(38px, -50%);
}

.character img {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.15));
}

/* === تنسيق المربع === */
.login-card {
  background: white;
  border-radius: 30px;
  padding: 50px 60px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  z-index: 5;
  overflow: visible;
}

.welcome-title {
  color: #0C9892;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
}

.input-group { position: relative; margin-bottom: 20px; }

.input-field {
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  background: #fff;
}

.input-field:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12, 152, 146, 0.1); }

.toggle-password {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  z-index: 2;
}

.forgot-password { 
  color: #333; 
  cursor: pointer; 
  margin-bottom: 25px; 
  font-size: 14px; 
  text-decoration: underline; 
  display: inline-block;
  position: relative;
  z-index: 2;
}
.forgot-password:hover { color: #0C9892; }

.btn-login {
  width: 100%;
  padding: 16px;
  background: #0C9892;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(12, 152, 146, 0.3);
  position: relative;
  z-index: 2;
}

.btn-login:hover { background: #0a827d; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(12, 152, 146, 0.4); }

.divider { height: 1px; background: #e0e0e0; margin: 25px 0; position: relative; z-index: 2; }

.create-account { color: #333; font-size: 15px; position: relative; z-index: 2; }
.create-link { color: #0C9892; cursor: pointer; font-weight: 600; }
.create-link:hover { text-decoration: underline; }

@media (max-width: 968px) {
  .character { display: none; }
  .login-card { padding: 40px 30px; }
}
</style>