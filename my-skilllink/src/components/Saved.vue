<template>
  <div class="saved-page">
    <Navbar />
    <div class="container py-5 px-4">
      <h1 class="page-title">Saved</h1>
      <div class="posts-feed">
        <div class="post-card mb-4" v-for="(post, index) in savedPosts" :key="index">
          <div class="post-header"><img :src="post.avatar" :alt="post.author" class="post-avatar"><h5 class="post-author">{{ post.author }}</h5></div>
          <div class="post-content"><p>{{ post.text }}</p></div>
          <div class="post-footer">
            <span class="comments-count">{{ post.comments }} comments</span>
            <div class="post-actions">
              <i class="far fa-comment action-icon"></i>
              <i class="far fa-paper-plane action-icon"></i>
              <i class="fas fa-bookmark action-icon bookmark-icon" :class="{ 'bookmarked': post.bookmarked }" @click="toggleBookmark(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Robot Icon -->
    <div class="robot-wrapper" @click="toggleChatbot">
      <div class="robot-circle"><img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img"></div>
    </div>

    <!-- Chatbot Modal -->
    <div v-if="showChatbot" class="chatbot-modal" @click.self="closeChatbot">
      <div class="chatbot-container">
        <div class="chatbot-header"><h3>SkillLink Chatbot</h3><button class="close-chatbot" @click="closeChatbot"><i class="fas fa-times"></i></button></div>
        <div class="chatbot-body"><iframe src="https://graduation-chatbot-project--toqamohsen592.replit.app" frameborder="0" class="chatbot-iframe"></iframe></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'Saved',
  components: { Navbar },
  data() {
    return {
      showChatbot: false,
      savedPosts: [
        { author: 'Omar Sultan', avatar: '/src/assets/Omar.jpg', text: 'Hey everyone, has anyone worked on an SEO article project before? The client wants 10 articles per week is that realistic or too much? Any tips would be appreciated', comments: 3, bookmarked: true },
        { author: 'Salma Sameh', avatar: '/src/assets/Salma.jpg', text: 'Why do you think some proposals get accepted while others don\'t, even when the service is the same? Is it about skills, the proposal style, or timing? Anyone had a similar experience ?', comments: 6, bookmarked: true }
      ]
    }
  },
  methods: {
    toggleChatbot() { this.showChatbot = !this.showChatbot; },
    closeChatbot() { this.showChatbot = false; },
    toggleBookmark(index) { this.savedPosts[index].bookmarked = !this.savedPosts[index].bookmarked; }
  }
}
</script>

<style scoped>
.saved-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
.page-title { font-size: 32px; font-weight: 700; color: #000000; margin-bottom: 30px; }
.posts-feed { max-width: 900px; margin: 0 auto; }
.post-card { background-color: white; border-radius: 20px; padding: 25px; box-shadow: 3px 3px 6px rgba(0,0,0,0.1); transition: transform 0.2s; border: 1px solid #E0E0E0; margin-bottom: 25px; }
.post-card:hover { transform: translateY(-2px); box-shadow: 4px 4px 8px rgba(0,0,0,0.15); }
.post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.post-avatar { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; }
.post-author { font-size: 22px; font-weight: 700; color: #000; margin: 0; }
.post-content { margin-bottom: 20px; }
.post-content p { font-size: 18px; line-height: 1.6; color: #333; margin: 0; }
.post-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #f0f0f0; }
.comments-count { font-size: 15px; color: #666; }
.post-actions { display: flex; align-items: center; gap: 15px; }
.action-icon { font-size: 22px; cursor: pointer; transition: all 0.2s; color: #999; }
.action-icon:hover { color: #0C9892; transform: scale(1.15); }
.bookmark-icon.bookmarked { color: #0C9892; font-weight: 900; }
.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }

.chatbot-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.chatbot-container { background-color: white; border-radius: 20px; width: 90%; max-width: 500px; height: 80vh; max-height: 700px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; animation: slideUp 0.3s ease; }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.chatbot-header { background: linear-gradient(135deg, #0C9892 0%, #14B5A5 100%); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.chatbot-header h3 { margin: 0; font-size: 20px; font-weight: 700; }
.close-chatbot { background: none; border: none; color: white; font-size: 24px; cursor: pointer; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }
.close-chatbot:hover { background-color: rgba(255,255,255,0.2); transform: rotate(90deg); }
.chatbot-body { flex: 1; overflow: hidden; }
.chatbot-iframe { width: 100%; height: 100%; border: none; }
@media (max-width: 768px) { .robot-wrapper { display: none; } }
</style>  