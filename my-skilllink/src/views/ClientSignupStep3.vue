<template>
  <div class="step-page">
    <div class="logo-header" @click="$router.push('/')"><span class="logo-s">S</span><span class="logo-killlink">killLink</span></div>
    <div class="step-container">
      <div class="sidebar">
        <div class="step-item"><span class="step-num">1</span><span class="step-text">Personal Info</span></div>
        <div class="step-line"></div>
        <div class="step-item"><span class="step-num">2</span><span class="step-text">Company Info</span></div>
        <div class="step-line"></div>
        <div class="step-item active"><span class="step-num">3</span><span class="step-text">Security</span></div>
      </div>
      <div class="form-card">
        <h2>Verify Phone Number</h2>
        <p class="desc">Thank you for taking a moment to verify your phone number. <a href="#">Learn more</a></p>
        <div class="form-row"><label>Enter country</label><select v-model="form.country"><option>Select country</option><option>Egypt (+20)</option><option>Saudi Arabia (+966)</option><option>UAE (+971)</option></select></div>
        <div class="form-row"><label>Enter your phone number</label><input v-model="form.phone" placeholder="phone number"></div>
        <p class="privacy">Your phone number will remain private. <a href="#">Privacy Policy</a></p>
        <div class="btn-group">
          <button class="btn-verify" @click="showCodeModal = true">Verify by text</button>
          <button class="btn-verify" @click="showCodeModal = true">Verify by call</button>
        </div>
      </div>
    </div>

    <!-- Code Modal -->
    <div v-if="showCodeModal" class="modal-overlay" @click.self="showCodeModal = false">
      <div class="modal-card">
        <button class="close-btn" @click="showCodeModal = false">×</button>
        <h2 class="modal-title">Verify phone number</h2>
        <p>A verification code has been sent to (via WhatsApp):<br><strong>+20-xxxxxxxxxx</strong></p>
        <input class="code-input" maxlength="6" placeholder="------" v-model="code">
        <button class="btn-confirm" @click="verifyCode">Confirm Code</button>
        <p class="help-text">If you did not receive the code, please check and try again</p>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="showSuccessModal = false">
      <div class="modal-card">
        <button class="close-btn" @click="showSuccessModal = false">×</button>
        <h2 class="modal-title">Verification complete !</h2>
        <p>Your phone number was verified successfully. Thank you!</p>
        <button class="btn-ok" @click="completeSignup">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      form: { country: '', phone: '' },
      code: '',
      showCodeModal: false,
      showSuccessModal: false
    }
  },
  methods: {
    verifyCode() {
      if (this.code.length !== 6) {
        alert('Please enter 6-digit code'); return;
      }
      this.showCodeModal = false;
      this.showSuccessModal = true;
    },
    completeSignup() {
      // هنا يتم حفظ بيانات العميل
      localStorage.setItem('userType', 'client');
      this.$router.push('/client-home');
    }
  }
}
</script>

<style scoped>
.step-page { min-height: 100vh; background: #f8f9fa; display: flex; justify-content: center; align-items: center; position: relative; }
.logo-header { position: absolute; top: 30px; left: 50px; font-size: 32px; font-weight: 700; cursor: pointer; }
.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; } .logo-killlink { color: #000; }
.step-container { display: flex; align-items: center; gap: 60px; }
.sidebar { display: flex; flex-direction: column; align-items: center; }
.step-item { display: flex; align-items: center; gap: 15px; }
.step-num { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #0C9892; display: flex; align-items: center; justify-content: center; color: #0C9892; font-weight: 700; background: white; }
.step-item.active .step-num { background: #0C9892; color: white; }
.step-text { font-weight: 600; color: #0C9892; }
.step-line { width: 2px; height: 40px; background: #0C9892; margin: 5px 0; }
.form-card { background: white; border-radius: 30px; padding: 50px; width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.form-card h2 { font-size: 24px; margin-bottom: 10px; color: #222; }
.desc, .privacy { font-size: 15px; color: #555; margin-bottom: 20px; line-height: 1.5; }
.desc a, .privacy a { color: #007bff; text-decoration: none; }
.form-row { margin-bottom: 20px; }
.form-row label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 18px; color: #222; }
input, select { width: 100%; padding: 12px 18px; border: 1px solid #ccc; border-radius: 20px; font-size: 15px; outline: none; }
input:focus, select:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12,152,146,0.1); }
.btn-group { display: flex; gap: 15px; margin-top: 30px; }
.btn-verify { flex: 1; padding: 14px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 17px; font-weight: 600; cursor: pointer; }
.btn-verify:hover { background: #0a827d; transform: translateY(-2px); }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.3); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-card { background: white; border-radius: 25px; padding: 40px; width: 420px; text-align: center; position: relative; box-shadow: 0 15px 40px rgba(12,152,146,0.2); }
.close-btn { position: absolute; top: 15px; right: 20px; font-size: 24px; background: none; border: none; cursor: pointer; color: #666; }
.modal-title { color: #0C9892; font-size: 24px; margin-bottom: 15px; }
.code-input { width: 80%; padding: 15px; text-align: center; letter-spacing: 10px; font-size: 20px; margin: 20px 0; border: 1px solid #ccc; border-radius: 30px; }
.btn-confirm, .btn-ok { width: 100%; padding: 14px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 18px; font-weight: 600; cursor: pointer; margin-top: 10px; }
.help-text { font-size: 13px; color: #555; margin-top: 15px; }
@media (max-width: 900px) { .step-container { flex-direction: column; } .sidebar { flex-direction: row; } .step-line { width: 40px; height: 2px; } }
</style>