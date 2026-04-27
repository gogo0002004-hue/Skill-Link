<template>
  <div class="step-page">
    <div class="logo-header" @click="$router.push('/')"><span class="logo-s">S</span><span class="logo-killlink">killLink</span></div>
    <div class="step-container">
      <div class="sidebar">
        <div class="step-item"><span class="step-num">1</span><span class="step-text">Personal Info</span></div>
        <div class="step-line"></div>
        <div class="step-item active"><span class="step-num">2</span><span class="step-text">Company Info</span></div>
        <div class="step-line"></div>
        <div class="step-item"><span class="step-num">3</span></div>
      </div>
      <div class="form-card">
        <div class="form-row"><label>Company Name</label><input v-model="form.companyName" placeholder="Enter company name"></div>
        <div class="form-row"><label>Industry</label><select v-model="form.industry"><option>Select industry</option><option>Technology</option><option>Marketing</option><option>Design</option><option>Finance</option><option>Other</option></select></div>
        <div class="form-row"><label>Website</label><input v-model="form.website" placeholder="https://yourcompany.com"></div>
        <div class="form-row"><label>Description</label><textarea v-model="form.description" placeholder="Tell us about your company" rows="4"></textarea></div>
        <button class="btn-continue" @click="nextStep">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { form: { companyName: '', industry: '', website: '', description: '' } }
  },
  methods: {
    nextStep() {
      if (!this.form.companyName || !this.form.industry) {
        alert('Please fill required fields'); return;
      }
      this.$router.push('/client-signup/step3');
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
.form-row { margin-bottom: 20px; }
.form-row label { display: block; margin-bottom: 8px; color: #0C9892; font-weight: 600; font-size: 18px; }
input, textarea, select { width: 100%; padding: 12px 18px; border: 1px solid #ccc; border-radius: 20px; font-size: 15px; outline: none; transition: 0.3s; }
input:focus, textarea:focus, select:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12,152,146,0.1); }
.btn-continue { margin-top: 20px; padding: 14px 40px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 17px; font-weight: 600; cursor: pointer; float: right; }
.btn-continue:hover { background: #0a827d; transform: translateY(-2px); }
@media (max-width: 900px) { .step-container { flex-direction: column; } .sidebar { flex-direction: row; } .step-line { width: 40px; height: 2px; } }
</style>