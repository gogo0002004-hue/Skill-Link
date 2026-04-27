<template>
  <div class="chatbot-overlay" v-if="isOpen" @click="closeChatbot">
    <div class="chatbot-window" @click.stop>
      <!-- Header -->
      <div class="chatbot-header">
        <div class="header-left">
          <div class="robot-icon-small">
            <img src="/src/assets/Chat bot.png" alt="Robot">
          </div>
          <h3 class="header-title">Chatbot</h3>
        </div>
        <div class="header-right">
          <button class="header-btn" @click="minimizeChatbot">
            <span>−</span>
          </button>
          <button class="header-btn" @click="closeChatbot">
            <span>✕</span>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="chatbot-content">
        <div class="robot-image-container">
          <div class="robot-circle-large">
            <img src="/src/assets/Chat bot.png" alt="Chatbot Robot" class="robot-large">
          </div>
        </div>
        <h2 class="chatbot-title">Chatbot</h2>
        <p class="encryption-text">
          Messages are secured with end-to-end encryption.<br>
          Only people in this chat can read, listen to, or share them.
        </p>
      </div>

      <!-- Input Bar -->
      <div class="chatbot-input-bar">
        <div class="input-icons-left">
          <img src="/src/assets/mike.png" alt="Microphone" class="input-icon">
          <img src="/src/assets/image.png" alt="Image" class="input-icon">
        </div>
        <div class="input-field-wrapper">
          <input type="text" placeholder="Aa" class="chatbot-input" v-model="message" @keyup.enter="sendMessage">
        </div>
        <button class="send-btn" @click="sendMessage">
          <img src="/src/assets/send.png" alt="Send" class="send-icon">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chatbot',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    closeChatbot() {
      this.$emit('close');
    },
    minimizeChatbot() {
      this.$emit('minimize');
    },
    sendMessage() {
      if (this.message.trim()) {
        console.log('Message sent:', this.message);
        this.message = '';
      }
    }
  }
}
</script>

<style scoped>
.chatbot-overlay {
  position: fixed;
  bottom: 0;
  right: 100px;
  width: 400px;
  height: 600px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.chatbot-window {
  background-color: #FFFFFF;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 3px solid #0C9892;
  overflow: hidden;
}

/* Header */
.chatbot-header {
  background-color: #0C9892;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.robot-icon-small {
  width: 35px;
  height: 35px;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.robot-icon-small img {
  width: 25px;
  height: 25px;
  object-fit: contain;
}

.header-title {
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.header-right {
  display: flex;
  gap: 10px;
}

.header-btn {
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 5px;
}

.header-btn:hover {
  background-color: rgba(255,255,255,0.2);
}

/* Content */
.chatbot-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #FFFFFF;
  text-align: center;
}

.robot-image-container {
  margin-bottom: 20px;
}

.robot-circle-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #FFFFFF;
}

.robot-large {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.chatbot-title {
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 15px 0;
}

.encryption-text {
  font-size: 16px;
  color: #999999;
  line-height: 1.6;
  margin: 0;
}

/* Input Bar */
.chatbot-input-bar {
  background-color: #F5F5F5;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #E0E0E0;
}

.input-icons-left {
  display: flex;
  gap: 10px;
}

.input-icon {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: all 0.2s;
}

.input-icon:hover {
  transform: scale(1.1);
}

.input-field-wrapper {
  flex: 1;
}

.chatbot-input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #0C9892;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  background-color: #FFFFFF;
}

.chatbot-input::placeholder {
  color: #CCCCCC;
  font-size: 18px;
}

.send-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.send-btn:hover {
  transform: scale(1.1);
}

.send-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

/* Responsive */
@media (max-width: 768px) {
  .chatbot-overlay {
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .chatbot-window {
    border-radius: 0;
    border: none;
  }
}
</style>