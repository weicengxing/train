<template>
  <div class="app">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-header">
        <div class="logo">
          🤖 Claude
        </div>
        <button class="new-chat-btn" @click="startNewChat">
          ➕ 新对话
        </button>
      </div>
      <div class="chat-list">
        <div 
          v-for="chat in chatHistory" 
          :key="chat.id"
          class="chat-item"
          :class="{ active: currentChatId === chat.id }"
          @click="switchChat(chat.id)"
        >
          {{ chat.title }}
        </div>
      </div>
    </div>

    <!-- 主聊天区域 -->
    <div class="main-chat">
      <div class="chat-header">
        <div class="chat-title">{{ currentChat?.title || 'Claude聊天' }}</div>
        <div class="model-badge">Claude Sonnet 4</div>
      </div>

      <div class="messages-container" ref="messagesContainer">
        <!-- 空状态 -->
        <div v-if="currentMessages.length === 0" class="empty-state">
          <h2>✨ 回来了,{{ name }}</h2>
          <p>准备好开始新的对话了吗？</p>
          <div class="feature-buttons">
            <button class="feature-btn" @click="sendSampleMessage('写作')">
              ✍️ 写作
            </button>
            <button class="feature-btn" @click="sendSampleMessage('学习')">
              📚 学习
            </button>
            <button class="feature-btn" @click="sendSampleMessage('编程')">
              💻 编程
            </button>
            <button class="feature-btn" @click="sendSampleMessage('生活助手')">
              🏠 生活助手
            </button>
            <button class="feature-btn" @click="sendSampleMessage('Claude的选择')">
              🎯 Claude的选择
            </button>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-for="message in currentMessages" :key="message.id" class="message" :class="message.role">
          <div class="avatar" :class="message.role">
            {{ message.role === 'user' ? 'AH' : 'C' }}
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>

        <!-- 打字指示器 -->
        <div v-if="isTyping" class="message assistant">
          <div class="avatar assistant">C</div>
          <div class="message-content">
            <div class="typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <div class="input-container">
          <textarea 
            v-model="inputMessage"
            @keydown.enter.prevent="handleEnter"
            @input="adjustTextareaHeight"
            placeholder="给Claude发消息..."
            class="message-input"
            rows="1"
            ref="messageInput"
          ></textarea>
          <button 
            class="send-btn" 
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isTyping"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 导入 useRoute
import router from "../router";
import request from "../utils/request"; // 假设这是您封装的请求工具
// 响应式数据
const sidebarOpen = ref(false)
const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)
const messageInput = ref(null)
const name = ref('Amir Hosein')
const currentChatId = ref(1)
const chatHistory = ref([
  { id: 1, title: '新对话', messages: [] }
])

// 计算属性
const currentChat = computed(() => 
  chatHistory.value.find(chat => chat.id === currentChatId.value)
)

const currentMessages = computed(() => 
  currentChat.value?.messages || []
)

// 方法
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isTyping.value) return

  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date()
  }

  currentChat.value.messages.push(userMessage)
  
  // 更新聊天标题
  if (currentMessages.value.length === 1) {
    currentChat.value.title = inputMessage.value.slice(0, 30) + (inputMessage.value.length > 30 ? '...' : '')
  }

  const userInput = inputMessage.value
  inputMessage.value = ''
  
  await nextTick()
  scrollToBottom()

  // 模拟AI回复
  await simulateAIResponse(userInput)
}

const simulateAIResponse = async (userInput) => {
  isTyping.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  const responses = [
    "我理解你的问题。让我来帮你分析一下这个问题的几个方面...",
    "这是一个很有趣的问题！根据我的理解，我可以从以下几个角度来回答：",
    "感谢你的提问。基于你提到的内容，我建议我们可以这样来看待这个问题...",
    "你提出了一个很好的观点。让我详细解释一下相关的概念和可能的解决方案...",
    "我很乐意帮助你解决这个问题。首先，让我们来梳理一下关键信息..."
  ]

  const aiMessage = {
    id: Date.now(),
    role: 'assistant',
    content: responses[Math.floor(Math.random() * responses.length)],
    timestamp: new Date()
  }
   await request.post("/web/fetch?message='你好'").then(res => {
    
      aiMessage.content = res.data;
     
      if(res.data==null) aiMessage.content = "抱歉，我无法理解您的问题。请尝试重新表述。";
    })

  currentChat.value.messages.push(aiMessage)
  isTyping.value = false
  
  await nextTick()
  scrollToBottom()
}

const handleEnter = (event) => {
  if (!event.shiftKey) {
    sendMessage()
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const startNewChat = () => {
  const newChatId = Date.now()
  const newChat = {
    id: newChatId,
    title: '新对话',
    messages: []
  }
  chatHistory.value.unshift(newChat)
  currentChatId.value = newChatId
}

const switchChat = (chatId) => {
  currentChatId.value = chatId
}

const sendSampleMessage = async (type) => {
  const sampleMessages = {
    '写作': '帮我写一篇关于人工智能发展的文章',
    '学习': '解释一下量子物理的基本概念',
    '编程': '用Python写一个简单的计算器程序',
    '生活助手': '推荐一些健康的早餐食谱',
    'Claude的选择': '你觉得今天我们聊什么话题比较有趣？'
  }
  
  inputMessage.value = sampleMessages[type]
  await sendMessage()
}

const adjustTextareaHeight = () => {
  const textarea = messageInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

onMounted(() => {
  // 聚焦输入框
  if (messageInput.value) {
    messageInput.value.focus()
  }

  const route = useRoute() // 使用 useRoute 获取当前路由对象
  const res = route.query.name; // 从路由查询参数中获取 name

  if(res != null) {
    name.value = res.toString();
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8f9fa;
}

/* 侧边栏 */
.sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e5e5e5;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-chat-btn {
  background: #d97706;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
  font-size: 14px;
  transition: background-color 0.2s;
}

.new-chat-btn:hover {
  background: #c2610c;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.chat-item {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #4a5568;
}

.chat-item:hover {
  background: #f7fafc;
}

.chat-item.active {
  background: #e6fffa;
  color: #065f46;
}

/* 主聊天区域 */
.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.chat-header {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.model-badge {
  background: #f0f9ff;
  color: #0369a1;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 800px;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.avatar.user {
  background: #ddd6fe;
  color: #5b21b6;
}

.avatar.assistant {
  background: #d97706;
  color: white;
}

.message-content {
  background: #f8fafc;
  padding: 16px 20px;
  border-radius: 18px;
  border-top-left-radius: 4px;
  line-height: 1.6;
  color: #374151;
}

.message.user .message-content {
  background: #e0e7ff;
  border-top-left-radius: 18px;
  border-top-right-radius: 4px;
}

/* 输入区域 */
.input-area {
  padding: 24px;
  border-top: 1px solid #e5e5e5;
}

.input-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.message-input {
  width: 100%;
  padding: 16px 60px 16px 20px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  resize: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.message-input:focus {
  border-color: #d97706;
}

.send-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #d97706;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.send-btn:hover {
  background: #c2610c;
}

.send-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* 功能按钮 */
.feature-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-btn {
  background: white;
  border: 1px solid #e5e5e5;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
  transition: all 0.2s;
}

.feature-btn:hover {
  border-color: #d97706;
  color: #d97706;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px;
}

.empty-state h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 32px;
}

/* 加载动画 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 16px 20px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-chat {
    width: 100%;
  }

  .messages-container {
    padding: 16px;
  }

  .input-area {
    padding: 16px;
  }
}
</style>
