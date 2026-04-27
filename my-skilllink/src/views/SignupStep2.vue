<template>
  <div class="step-page">
    <div class="logo-header" @click="$router.push('/')">
      <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
    </div>
    
    <div class="step-container">
      <!-- Sidebar Progress -->
      <div class="sidebar">
        <div class="step-item"><span class="step-num">1</span><span class="step-text">Personal Info</span></div>
        <div class="step-line"></div>
        <div class="step-item active"><span class="step-num">2</span><span class="step-text">Professional Info</span></div>
        <div class="step-line"></div>
        <div class="step-item"><span class="step-num">3</span></div>
      </div>

      <!-- Main Form Card -->
      <div class="form-card">
        <div class="form-row">
          <label>Category</label>
          <div class="input-plus">
            <select>
              <option>Select category</option>
              <option>Graphic Design</option>
              <option>Web Development</option>
              <option>Marketing</option>
            </select>
            <button>+</button>
          </div>
        </div>

        <div class="form-row">
          <label>Skills</label>
          <div class="input-plus">
            <input placeholder="Add skill">
            <button>+</button>
          </div>
        </div>

        <div class="form-row">
          <label>Education</label>
          <input placeholder="University / Institute" style="margin-bottom:15px">
          <input placeholder="College" style="margin-bottom:15px">
          <input placeholder="Years of study ex2021-2024">
        </div>

        <!-- Social Media Links Section (Modified with Icons) -->
        <div class="form-row">
          <label>Social media links</label>
          
          <!-- LinkedIn -->
          <div class="input-with-icon">
            <i class="fab fa-linkedin-in"></i>
            <input placeholder="Linkedin Profile URL">
          </div>
          
          <!-- GitHub -->
          <div class="input-with-icon">
            <i class="fab fa-github"></i>
            <input placeholder="GitHub Profile URL">
          </div>
          
          <!-- Behance -->
          <div class="input-with-icon">
            <i class="fab fa-behance"></i>
            <input placeholder="Behance Profile URL">
          </div>
        </div>

        <button class="btn-continue" @click="$router.push('/signup/step3')">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-page { min-height: 100vh; background: #f8f9fa; display: flex; justify-content: center; align-items: center; position: relative; }
.logo-header { position: absolute; top: 30px; left: 50px; font-size: 32px; font-weight: 700; cursor: pointer; }
.logo-s { color: #0C9892; font-family: 'Dancing Script', cursive; } 
.logo-killlink { color: #000; }

.step-container { display: flex; align-items: center; gap: 60px; }
.sidebar { display: flex; flex-direction: column; align-items: center; }
.step-item { display: flex; align-items: center; gap: 15px; }
.step-num { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #0C9892; display: flex; align-items: center; justify-content: center; color: #0C9892; font-weight: 700; background: white; transition: 0.3s; }
.step-item.active .step-num { background: #0C9892; color: white; }
.step-text { font-weight: 600; color: #0C9892; }
.step-line { width: 2px; height: 40px; background: #0C9892; margin: 5px 0; }

.form-card { background: white; border-radius: 30px; padding: 50px; width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.form-row { margin-bottom: 20px; }
.form-row label { display: block; margin-bottom: 8px; color: #0C9892; font-weight: 600; font-size: 18px; }

/* Styles for Inputs with Plus Button */
.input-plus { display: flex; gap: 10px; align-items: center; }
.input-plus button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ccc; background: white; font-size: 20px; cursor: pointer; transition: 0.3s; }
.input-plus button:hover { background: #f0f0f0; }

/* Styles for Inputs with Social Icons */
.input-with-icon { position: relative; margin-bottom: 10px; }
.input-with-icon i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #333;
  font-size: 18px;
  z-index: 1;
}
.input-with-icon input { padding-left: 45px; }

/* General Input Styles */
input, select { 
  width: 100%; 
  padding: 12px 18px; 
  border: 1px solid #ccc; 
  border-radius: 20px; 
  font-size: 15px; 
  outline: none; 
  transition: 0.3s; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05); 
}
input:focus, select:focus { border-color: #0C9892; box-shadow: 0 0 0 3px rgba(12,152,146,0.1); }

.btn-continue { margin-top: 20px; padding: 14px 40px; background: #0C9892; color: white; border: none; border-radius: 30px; font-size: 17px; font-weight: 600; cursor: pointer; float: right; transition: 0.3s; box-shadow: 0 4px 12px rgba(12,152,146,0.3); }
.btn-continue:hover { background: #0a827d; transform: translateY(-2px); }

@media (max-width: 900px) { 
  .step-container { flex-direction: column; } 
  .sidebar { flex-direction: row; gap: 20px; margin-bottom: 20px; } 
  .step-line { width: 40px; height: 2px; } 
  .form-card { width: 100%; padding: 30px; } 
}
</style>