<template>
  <div class="step-page">
    <div class="logo-header" @click="$router.push('/')"><span class="logo-s">S</span><span class="logo-killlink">killLink</span></div>
    <div class="step-container">
      <div class="sidebar">
        <div class="step-item active"><span class="step-num">1</span><span class="step-text">Personal Info</span></div>
        <div class="step-line"></div>
        <div class="step-item"><span class="step-num">2</span></div>
        <div class="step-line"></div>
        <div class="step-item"><span class="step-num">3</span></div>
      </div>
      <div class="form-card">
        <div class="photo-upload"><i class="fas fa-camera"></i></div>
        <div class="form-row"><label>Full name</label><div class="half-inputs"><input placeholder="First name"><input placeholder="Last name"></div></div>
        <div class="form-row"><label>Address</label><input placeholder="Address"></div>
        <div class="form-row"><label>Date of birth</label><input type="date"></div>
        <div class="form-row"><label>Languages</label><div class="input-plus"><input placeholder="Language"><button>+</button></div></div>
        <div class="form-row"><label>Description</label><textarea placeholder="About me" rows="3"></textarea></div>
        <button class="btn-continue" @click="$router.push('/signup/step2')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-page { min-height: 100vh; background: #f8f9fa; display: flex; justify-content: center; align-items: center; position: relative; }
.logo-header { position: absolute; top: 30px; left: 50px; font-size: 32px; font-weight: 700; cursor: pointer; }
.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; } .logo-killlink { color: #000; }
.step-container { display: flex; align-items: center; gap: 60px; }

.sidebar { display: flex; flex-direction: column; align-items: center; }
.step-item { display: flex; align-items: center; gap: 15px; }
.step-num { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #0C9892; display: flex; align-items: center; justify-content: center; color: #0C9892; font-weight: 700; background: white; transition: 0.3s; }
.step-item.active .step-num { background: #0C9892; color: white; }
.step-text { font-weight: 600; color: #0C9892; }
.step-line { width: 2px; height: 40px; background: #0C9892; margin: 5px 0; }

.form-card { background: white; border-radius: 30px; padding: 50px; width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.photo-upload { width: 70px; height: 70px; border-radius: 50%; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; font-size: 24px; color: #aaa; box-shadow: 0 4px 10px rgba(0,0,0,0.1); cursor: pointer; }
.form-row { margin-bottom: 20px; }
.form-row label { display: block; margin-bottom: 8px; color: #0C9892; font-weight: 600; font-size: 18px; }
.half-inputs { display: flex; gap: 15px; }
input, textarea { width: 100%; padding: 12px 18px; border: 1px solid #ccc; border-radius: 20px; font-size: 15px; outline: none; transition: 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
input:focus, textarea:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12,152,146,0.1); }
.input-plus { display: flex; gap: 10px; align-items: center; }
.input-plus button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ccc; background: white; font-size: 20px; cursor: pointer; transition: 0.3s; }
.input-plus button:hover { background: #f0f0f0; }
.btn-continue { margin-top: 20px; padding: 14px 40px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 17px; font-weight: 600; cursor: pointer; float: right; transition: 0.3s; box-shadow: 0 4px 12px rgba(12,152,146,0.3); }
.btn-continue:hover { background: #0a827d; transform: translateY(-2px); }
@media (max-width: 900px) { .step-container { flex-direction: column; } .sidebar { flex-direction: row; gap: 20px; margin-bottom: 20px; } .step-line { width: 40px; height: 2px; } .form-card { width: 100%; padding: 30px; } }
</style>