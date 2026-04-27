<template>
  <router-view />
  <Chatbot :isOpen="isChatbotOpen" @close="closeChatbot" @minimize="minimizeChatbot" />
</template>

<script>
import Chatbot from './components/Chatbot.vue'

export default {
  name: 'App',
  components: {
    Chatbot
  },
  data() {
    return {
      isChatbotOpen: false
    }
  },
  methods: {
    openChatbot() {
      this.isChatbotOpen = true;
    },
    closeChatbot() {
      this.isChatbotOpen = false;
    },
    minimizeChatbot() {
      this.isChatbotOpen = false;
    }
  },
  created() {
    window.addEventListener('open-chatbot', this.openChatbot);
  },
  beforeDestroy() {
    window.removeEventListener('open-chatbot', this.openChatbot);
  }
}
</script>