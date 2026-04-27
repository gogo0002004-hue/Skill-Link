<template>
  <div class="success-page">
    <!-- اللوجو -->
    <div class="logo-header" @click="$router.push('/login')">
      <span class="logo-s">S</span><span class="logo-killlink">killLink</span>
    </div>
    
    <div class="success-container">
      <div class="success-card">
        <div class="success-image">
          <img src="/src/assets/Happy announcement-cuate.png" alt="Success">
        </div>
        
        <h1 class="title">Password reset successfully</h1>
        
        <!-- النص هنا هيتظبط تلقائيا عشان يبقى جوا المربع -->
        <p class="description">
          Your password has been updated. You can now sign in to your account.
        </p>
        
        <button class="btn-continue" @click="$router.push('/login')">Continue to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordSuccess',
  methods: {}
}
</script>

<style scoped>
.success-page {
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

.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.success-card {
  background: white;
  border-radius: 30px;
  padding: 50px 60px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.success-image { margin-bottom: 20px; }

.success-image img {
  width: 300px; 
  height: auto;
}

.title {
  color: #0C9892;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
}

/* === التعديل هنا: إزالة الخاصية اللي كانت بتطلع النص برا === */
.description {
  color: #333;
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 30px;
  /* white-space: nowrap; <-- تم حذف هذا السطر عشان النص يبقى جوا المربع */
}
/* ============================================== */

.btn-continue {
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
}

.btn-continue:hover { background: #0a827d; transform: translateY(-2px); }

@media (max-width: 768px) {
  .success-card { padding: 40px 30px; }
  .success-image img { width: 250px; }
}
</style>