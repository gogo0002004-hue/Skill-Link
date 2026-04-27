<template>
  <div class="project-details-page">
    <Navbar />

    <!-- Main Content -->
    <div class="container py-5 px-4">
      <div class="project-header mb-4">
        <h1 class="project-title">{{ project.title }}</h1>
        <span class="project-status">{{ getStatusText() }}</span>
      </div>

      <div class="project-info mb-5">
        <h2 class="section-heading">Project info</h2>
        <p class="client-name">From <span class="text-teal">{{ project.client }}</span></p>
        <div class="description"><strong>Description:</strong> {{ project.description }}</div>
        <div class="project-details">
          <div class="detail-item"><strong>Budget:</strong> {{ project.budget }}</div>
          <div class="detail-item"><strong>Deadline:</strong> {{ project.deadline }}</div>
          <div class="detail-item"><strong>Category:</strong> {{ project.category }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 mb-4">
          <h2 class="section-heading mb-3">Tasks</h2>
          <div class="tasks-container">
            <div class="task-item" v-for="(task, index) in tasks" :key="index">
              <div class="checkbox-wrapper">
                <input type="checkbox" :id="'task-' + index" v-model="task.completed" @change="updateProgress" class="custom-checkbox">
                <label :for="'task-' + index" class="task-label" :class="{ completed: task.completed }">{{ task.name }}</label>
              </div>
              <button @click="removeTask(index)" class="remove-btn">×</button>
            </div>
            <button @click="addTask" class="add-btn"><span class="add-symbol">+</span></button>
          </div>
        </div>

        <div class="col-lg-6 mb-4">
          <h2 class="section-heading mb-3">Files</h2>
          <div class="files-container">
            <div class="file-item" v-for="(file, index) in files" :key="index">
              <i class="fas fa-file file-icon"></i>
              <span class="file-name">{{ file.name }}</span>
              <button @click="removeFile(index)" class="remove-file-btn">×</button>
            </div>
            <button @click="addFile" class="add-btn"><span class="add-symbol">+</span></button>
          </div>
        </div>
      </div>

      <div class="submit-section mt-5">
        <button class="submit-btn">Submit final work</button>
      </div>
    </div>

    <!-- Robot Icon -->
    <div class="robot-wrapper" @click="openChatbot">
      <div class="robot-circle">
        <img src="/src/assets/Chat bot.png" alt="Robot" class="robot-img">
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'ProjectDetails',
  components: { Navbar },
  data() {
    return {
      project: { title: 'Dashboard UI Design', client: 'Mariam Ahmed', description: 'Design a clean, modern, and user-friendly dashboard that clearly presents data, supports easy navigation, and follows modern UI/UX best practices. The interface should be responsive, visually consistent, and intuitive to use.', budget: '$85', deadline: '8 days', category: 'Design & Creative' },
      tasks: [{ name: 'Dashboard', completed: true }, { name: 'Recent projects menu', completed: false }, { name: 'Applying carousel', completed: false }],
      files: [{ name: 'Dashboard1.png' }, { name: 'Dashboard2.png' }, { name: 'Adobe XD 2025-12-08 21-15-27.mp4' }]
    }
  },
  methods: {
    openChatbot() { window.dispatchEvent(new CustomEvent('open-chatbot')); },
    getStatusText() { if (this.tasks.length === 0) return 'Upcoming'; const completedTasks = this.tasks.filter(task => task.completed).length; if (completedTasks === 0) return 'Upcoming'; if (completedTasks === this.tasks.length) return 'Completed'; return 'In progress'; },
    updateProgress() { this.$emit('tasks-updated', this.tasks); },
    addTask() { const taskName = prompt('Enter task name:'); if (taskName && taskName.trim()) { this.tasks.push({ name: taskName.trim(), completed: false }); this.$emit('tasks-updated', this.tasks); } },
    removeTask(index) { if (confirm('Are you sure you want to remove this task?')) { this.tasks.splice(index, 1); this.$emit('tasks-updated', this.tasks); } },
    addFile() { const fileName = prompt('Enter file name:'); if (fileName && fileName.trim()) { this.files.push({ name: fileName.trim() }); } },
    removeFile(index) { if (confirm('Are you sure you want to remove this file?')) { this.files.splice(index, 1); } }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.project-details-page { min-height: 100vh; background-color: #F5F5F5; padding-bottom: 50px; }
.project-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.project-title { font-size: 36px; font-weight: 700; color: #000000; margin: 0; }
.project-status { background-color: #E0F2F1; color: #0C9892; padding: 10px 24px; border-radius: 20px; font-size: 18px; font-weight: 600; }
.section-heading { font-size: 28px; font-weight: 700; color: #000000; margin-bottom: 20px; }
.project-info { background-color: white; padding: 30px; border-radius: 20px; box-shadow: 3px 3px 6px rgba(0,0,0,0.1); }
.client-name { font-size: 20px; margin-bottom: 20px; }
.text-teal { color: #0C9892; font-weight: 600; }
.description { font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 20px; }
.project-details { display: flex; flex-direction: column; gap: 10px; }
.detail-item { font-size: 18px; color: #666; }
.detail-item strong { color: #000; }
.tasks-container, .files-container { background-color: white; padding: 25px; border-radius: 20px; box-shadow: 3px 3px 6px rgba(0,0,0,0.1); min-height: 200px; }
.task-item { display: flex; align-items: center; justify-content: space-between; padding: 15px; margin-bottom: 10px; background-color: #F9F9F9; border-radius: 12px; transition: background-color 0.2s; }
.task-item:hover { background-color: #F0F0F0; }
.checkbox-wrapper { display: flex; align-items: center; gap: 12px; flex: 1; }
.custom-checkbox { width: 22px; height: 22px; cursor: pointer; accent-color: #0C9892; }
.task-label { font-size: 18px; color: #333; cursor: pointer; transition: all 0.2s; }
.task-label.completed { text-decoration: line-through; color: #999; }
.remove-btn, .remove-file-btn { background: none; border: none; font-size: 24px; color: #999; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }
.remove-btn:hover, .remove-file-btn:hover { background-color: #FFE5E5; color: #E63946; }
.file-item { display: flex; align-items: center; gap: 12px; padding: 15px; margin-bottom: 10px; background-color: #F9F9F9; border-radius: 12px; transition: background-color 0.2s; }
.file-item:hover { background-color: #F0F0F0; }
.file-icon { width: 24px; height: 24px; color: #0C9892; font-size: 20px; }
.file-name { flex: 1; font-size: 17px; color: #333; word-break: break-all; }
.add-btn { background: none; border: 2px dashed #0C9892; border-radius: 12px; padding: 15px; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.add-btn:hover { background-color: #E0F2F1; }
.add-symbol { font-size: 28px; color: #0C9892; font-weight: bold; }
.submit-section { text-align: center; }
.submit-btn { background-color: #0C9892; color: white; border: none; border-radius: 30px; padding: 18px 60px; font-size: 20px; font-weight: 600; cursor: pointer; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: all 0.3s; width: 100%; max-width: 600px; }
.submit-btn:hover { background-color: #0a827d; transform: translateY(-2px); box-shadow: 4px 4px 8px rgba(0,0,0,0.2); }
.robot-wrapper { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); z-index: 100; animation: bounce 2s ease-in-out infinite; cursor: pointer; }
@keyframes bounce { 0%, 100% { transform: translateY(-50%) translateY(0); } 50% { transform: translateY(-50%) translateY(-15px); } }
.robot-circle { width: 70px; height: 70px; border-radius: 50%; background-color: #FFFFFF; border: 3px solid #0C9892; display: flex; align-items: center; justify-content: center; box-shadow: 3px 3px 6px rgba(0,0,0,0.16); transition: transform 0.2s; overflow: hidden; }
.robot-circle:hover { transform: scale(1.1); }
.robot-img { width: 50px; height: 50px; object-fit: contain; }
@media (max-width: 768px) { .project-header { flex-direction: column; align-items: flex-start; } .robot-wrapper { display: none; } }
</style>                                                                                                                                              