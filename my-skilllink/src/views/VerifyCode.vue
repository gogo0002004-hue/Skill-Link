<template>
  <div class="page-container">
    <div class="logo-header" @click="$router.push('/login')">
      <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
    </div>
    
    <div class="card">
      <h1 class="title">Verify code</h1>
      <p class="description">
        Enter the 6-digit code sent to your email or<br>
        phone number to verify your account.
      </p>
      
      <div class="code-input">
        <input 
          type="text" 
          v-model="code" 
          maxlength="6" 
          placeholder="------" 
          class="code-field"
          @input="formatCode"
        >
      </div>
      
      <button class="btn-confirm" @click="handleConfirm">Confirm Code</button>
      
      <div class="resend-text">
        Didn't receive the code? <span class="resend-link" @click="handleResend">Resend code</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifyCode',
  data() {
    return { code: '' }
  },
  methods: {
    formatCode() {
      this.code = this.code.replace(/\D/g, '');
    },
    handleConfirm() {
      if (this.code.length !== 6) {
        alert('Please enter a 6-digit code');
        return;
      }
      this.$router.push('/reset-password');
    },
    handleResend() {
      alert('Code resent!');
    }
  }
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.logo-header {
  position: absolute;
  top: 30px;
  left: 50px;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
}

.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; }
.logo-killlink { color: #000; }

.card {
  background: white;
  border-radius: 30px;
  padding: 50px 60px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.title {
  color: #0C9892;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.description {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.code-input { margin-bottom: 25px; }

.code-field {
  width: 100%;
  padding: 18px 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 24px;
  text-align: center;
  letter-spacing: 10px;
  outline: none;
  transition: all 0.3s;
  font-weight: 600;
}

.code-field:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12, 152, 146, 0.1); }

.btn-confirm {
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
  margin-bottom: 20px;
}

.btn-confirm:hover { background: #0a827d; transform: translateY(-2px); }

.resend-text { color: #333; font-size: 15px; }
.resend-link { color: #0C9892; cursor: pointer; font-weight: 600; }
.resend-link:hover { text-decoration: underline; }
</style>