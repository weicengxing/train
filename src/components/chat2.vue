<script setup>
// =================================================================
// 脚本部分未作任何修改，以确保所有原始功能完好无损。
// =================================================================
import { ref, onMounted, nextTick } from 'vue';
import { marked } from 'marked';
import { vOnClickOutside } from '@vueuse/components';
import { useRoute } from 'vue-router';

const availableModels = ref([]);
const selectedModel = ref('');
const userInput = ref('');
const conversationHistory = ref([
  { role: 'system', content: 'You are a helpful and friendly AI assistant. Format your responses using Markdown.' }
]);
const isLoading = ref(false);
const error = ref(null);
const isDropdownOpen = ref(false);

const route = useRoute();
const userName = ref('');

// Extract user name from route query parameters
onMounted(() => {
  const nameFromRoute = route.query.name;
  if (nameFromRoute) {
    userName.value = nameFromRoute.toString();
  }
});

const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;
const closeDropdown = () => isDropdownOpen.value = false;
const selectOption = (modelName) => {
  selectedModel.value = modelName;
  closeDropdown();
};

onMounted(async () => {
  try {
    //const response = await fetch('https://47f0-58-194-169-164.ngrok-free.app/api/models');
    const response = await fetch('https://5fdb-58-194-169-164.ngrok-free.app/api/models', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch models');
    const models = await response.json();
    availableModels.value = models;
    if (models.length > 0) {
      selectedModel.value = models[0].name;
    }
  } catch (e) {
    error.value = "无法从后端加载模型列表。请确保后端服务正在运行。";
    console.error(e);
  }
});

const parseStreamChunk = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.choices && parsed.choices[0]?.delta !== undefined) {
      if (parsed.choices[0].delta.content !== undefined) {
        return parsed.choices[0].delta.content;
      }
      return '';
    }
    if (parsed.choices && parsed.choices[0]?.finish_reason) {
      return '';
    }
    if (typeof parsed.content === 'string') {
      return parsed.content;
    }
    if (typeof parsed.text === 'string') {
      return parsed.text;
    }
    if (parsed.error) {
      const errorMsg = typeof parsed.error === 'string' ? parsed.error :
                        (parsed.error.message || JSON.stringify(parsed.error));
      throw new Error(`API 返回错误: ${errorMsg}`);
    }
    return '';
  } catch (e) {
    console.error('Failed to parse stream JSON or encountered API error:', jsonString, e);
    throw e;
  }
};

const sendMessage = async () => {
  error.value = null;
  if (!userInput.value.trim() || isLoading.value) return;
  if (!selectedModel.value) {
    error.value = '请先选择一个模型。';
    return;
  }
  const userMessage = userInput.value;
  conversationHistory.value.push({ role: 'user', content: userMessage });
  userInput.value = '';
  await nextTick();
  scrollToBottom();
  isLoading.value = true;
  conversationHistory.value.push({ role: 'assistant', content: '' });
  try {
    const response = await fetch(' https://5fdb-58-194-169-164.ngrok-free.app/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: conversationHistory.value,
        modelName: selectedModel.value,
        user: userName.value
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedContent = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n\n').filter(line => line.trim());
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const jsonData = line.substring(5).trim();
          if (jsonData === '[DONE]') break;
          const contentToAdd = parseStreamChunk(jsonData);
          if (contentToAdd) {
            conversationHistory.value[conversationHistory.value.length - 1].content += contentToAdd;
            accumulatedContent += contentToAdd;
            await nextTick();
            scrollToBottom();
          }
        }
      }
    }
  } catch (e) {
    console.error("请求失败:", e);
    error.value = e.message;
    if (!accumulatedContent) {
      conversationHistory.value[conversationHistory.value.length - 1].content = `**抱歉，发生错误：** ${e.message}`;
    }
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const renderMarkdown = (content) => {
  return marked.parse(content || '', { gfm: true, breaks: true, smartLists: true });
};
const chatWindow = ref(null);
const scrollToBottom = () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
  }
};
</script>

<template>
  <div class="aurora-background">
    <div class="aurora-shape shape-1"></div>
    <div class="aurora-shape shape-2"></div>
    <div class="aurora-shape shape-3"></div>
  </div>

  <div id="chat-container">
    <header class="header">
      <div class="title-area">
        <h1>CyberChat</h1>
        <p>AI Dialogue Interface</p>
      </div>
      <div class="config-area" v-on-click-outside="closeDropdown">
        <div class="custom-select">
          <div class="selected-option" @click="toggleDropdown">
            <span>{{ selectedModel || 'Select Model' }}</span>
            <svg class="arrow" :class="{ open: isDropdownOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </div>
          <transition name="dropdown-fade">
            <ul v-if="isDropdownOpen" class="options-list">
              <li v-for="model in availableModels" :key="model.name" @click="selectOption(model.name)">
                <span class="model-name">{{ model.name }}</span>
                <span class="model-description">{{ model.description }}</span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </header>

<main class="chat-window" ref="chatWindow">
  <transition-group name="message-fade" tag="div">
    <div v-for="(message, index) in conversationHistory.filter(m => m.role !== 'system')"
         :key="index"
         class="message-row">
      <div class="sender-label" :class="`sender-${message.role}`">
        {{ message.role === 'user' ? 'You' : 'AI' }}
      </div>
      <div class="message-bubble" 
           :class="{ 
             'user-bubble': message.role === 'user',
             'assistant-bubble glowing-text-container': message.role === 'assistant' 
           }" 
           v-html="renderMarkdown(message.content)">
      </div>
    </div>
  </transition-group>
  
  <div v-if="isLoading && conversationHistory[conversationHistory.length - 1].role === 'user'" class="message-row">
    <div class="sender-label sender-assistant">AI</div>
    <div class="message-bubble assistant-bubble">
      <div class="pulse-loader"></div>
    </div>
  </div>
</main>

<div v-if="error" class="error-banner">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
  </svg>
  <span>{{ error }}</span>
</div>

<footer class="input-area">
  <form @submit.prevent="sendMessage" class="input-form">
    <div class="input-wrapper">
      <input type="text" v-model="userInput" placeholder="Initiate dialogue..." :disabled="isLoading" autocomplete="off" />
    </div>
    <button type="submit" class="send-button" :disabled="isLoading || !userInput.trim()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
      </svg>
    </button>
  </form>
</footer>

  </div>
</template>

<style>
/* --- 1. 基础、主题和字体 --- */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400&display=swap');

:root {
  --font-primary: 'Roboto', sans-serif;
  --font-display: 'Orbitron', sans-serif;
  --bg-dark-1: #0a0710;
  --bg-dark-2: #1a1423;
  --bg-glass: rgba(26, 20, 35, 0.6);
  --border-color: rgba(113, 89, 193, 0.3);
  --text-primary: #DCDCDC;
  --text-secondary: #a095b7;
  --accent-cyan: #00f6ff;
  --accent-magenta: #ff00ff;
  --accent-purple: #7159c1;
  --silver-glow: #FFFFFF;
  --user-bubble-bg: linear-gradient(135deg, #4a3a80, var(--accent-purple));
  --assistant-bubble-bg: #2a2336;
  --error-bg: rgba(255, 0, 100, 0.2);
  --error-border: #ff0064;
}

body {
  margin: 0;
  font-family: var(--font-primary);
  background-color: var(--bg-dark-1);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

/* --- 2. 动态背景 (保持不变) --- */
.aurora-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; filter: blur(100px) saturate(1.5); }
.aurora-shape { position: absolute; border-radius: 50%; opacity: 0.6; }
.shape-1 { width: 500px; height: 500px; background: var(--accent-cyan); top: -150px; left: -150px; animation: move-aurora-1 25s infinite alternate; }
.shape-2 { width: 400px; height: 400px; background: var(--accent-magenta); bottom: -100px; right: -100px; animation: move-aurora-2 30s infinite alternate; }
.shape-3 { width: 300px; height: 300px; background: var(--accent-purple); bottom: 50%; right: 50%; transform: translate(50%, 50%); animation: move-aurora-3 20s infinite alternate; }
@keyframes move-aurora-1 { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(300px, 200px) rotate(180deg); } }
@keyframes move-aurora-2 { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(-400px, -150px) rotate(270deg); } }
@keyframes move-aurora-3 { from { transform: translate(50%, 50%) rotate(0deg); } to { transform: translate(150px, -150px) rotate(90deg); } }

/* --- 3. 主容器 (保持不变) --- */
#chat-container { width: 100%; max-width: 800px; height: 95vh; max-height: 900px; background-color: var(--bg-glass); backdrop-filter: blur(20px) saturate(120%); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; overflow: hidden; transition: all 0.3s ease; }

/* --- 4. 头部和模型选择器 (保持不变) --- */
.header { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
.title-area h1 { font-family: var(--font-display); margin: 0; font-size: 1.8rem; color: var(--accent-cyan); text-shadow: 0 0 5px var(--accent-cyan); }
.title-area p { margin: 0; color: var(--text-secondary); font-size: 0.8rem; }
.custom-select { position: relative; width: 250px; }
.selected-option { background-color: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.6rem 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease; }
.selected-option:hover { border-color: var(--accent-cyan); }
.selected-option .arrow { transition: transform 0.3s ease; color: var(--text-secondary); width: 20px; height: 20px; }
.selected-option .arrow.open { transform: rotate(180deg); }
.options-list { position: absolute; top: 110%; left: 0; right: 0; background: var(--bg-dark-2); border: 1px solid var(--border-color); border-radius: 8px; list-style: none; padding: 0.5rem 0; margin: 0; max-height: 250px; overflow-y: auto; z-index: 100; }
.options-list li { padding: 0.75rem 1.2rem; cursor: pointer; transition: background-color 0.2s; }
.options-list li:hover { background-color: var(--accent-purple); }
.model-name { font-weight: bold; }
.model-description { font-size: 0.8em; color: var(--text-secondary); margin-top: 4px; display: block; }
.options-list li:hover .model-description { color: var(--text-primary); }
.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* --- 5. 聊天窗口 --- */
.chat-window { flex-grow: 1; overflow-y: auto; padding: 1.5rem; }
.chat-window::-webkit-scrollbar { width: 8px; }
.chat-window::-webkit-scrollbar-track { background: transparent; }
.chat-window::-webkit-scrollbar-thumb { background-color: var(--accent-purple); border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
.chat-window::-webkit-scrollbar-thumb:hover { background-color: var(--accent-cyan); }
.message-row { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 1.5rem; }
.sender-label { font-size: 0.8rem; font-weight: bold; margin-bottom: 0.4rem; padding-left: 0.5rem; opacity: 0.8; }
.sender-user { color: var(--accent-purple); }
.sender-assistant { color: var(--accent-cyan); }
.message-bubble { max-width: 90%; padding: 0.8rem 1.3rem; border-radius: 18px; line-height: 1.6; word-wrap: break-word; text-align: left; /* 强制所有内部文本左对齐 */ }
.user-bubble { background: var(--user-bubble-bg); color: #fff; border-top-left-radius: 4px; }
.assistant-bubble { background: var(--assistant-bubble-bg); color: var(--text-primary); border-top-left-radius: 4px; box-shadow: 0 0 15px rgba(0, 246, 255, 0.1); }
.message-fade-enter-active { transition: all 0.5s ease; }
.message-fade-enter-from { opacity: 0; transform: translateY(20px); }

/* --- 6. 银色动态发光文字 --- */
.glowing-text-container { background: linear-gradient(90deg, var(--assistant-bubble-bg) 0%, var(--assistant-bubble-bg) 40%, var(--accent-cyan) 50%, var(--assistant-bubble-bg) 60%, var(--assistant-bubble-bg) 100%); background-size: 250% 100%; animation: gradient-scan 8s linear infinite; }
.glowing-text-container >>> * { -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 0 var(--text-primary), 0 0 5px rgba(0, 246, 255, 0.5), 0 0 10px rgba(0, 246, 255, 0.3); }
@keyframes gradient-scan { from { background-position: 100% 0; } to { background-position: -150% 0; } }

/* --- 7. Markdown 样式修正 (核心修复处) --- */
.message-bubble >>> p { 
  margin-top: 0;
  margin-bottom: 1rem;
}
.message-bubble >>> p:last-child {
  margin-bottom: 0;
}
.message-bubble >>> ul,
.message-bubble >>> ol {
  /* 移除浏览器默认的左侧内边距 */
  padding-left: 20px; /* 保留一个小的缩进以区分列表，使其美观 */
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.message-bubble >>> li {
  margin-bottom: 0.5rem; /* 增加列表项之间的间距 */
}
.message-bubble >>> a { color: var(--accent-cyan); text-decoration: none; border-bottom: 1px dotted var(--accent-cyan); transition: all 0.2s; }
.message-bubble >>> a:hover { text-shadow: 0 0 5px var(--accent-cyan); border-bottom-style: solid; }

.glowing-text-container >>> pre,
.glowing-text-container >>> code { -webkit-background-clip: unset !important; background-clip: unset !important; color: var(--accent-magenta) !important; text-shadow: none !important; background-color: rgba(0,0,0,0.3); }
.glowing-text-container >>> pre { padding: 1rem; border-radius: 8px; }

/* --- 8. 加载动画 (保持不变) --- */
.pulse-loader { width: 50px; height: 20px; position: relative; display: flex; align-items: center; justify-content: space-between; }
.pulse-loader:before, .pulse-loader:after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); animation: pulse-loader-anim 1s infinite alternate; }
.pulse-loader:after { animation-delay: 0.5s; }
@keyframes pulse-loader-anim { from { transform: scale(1); opacity: 1; } to { transform: scale(0.5); opacity: 0.5; } }

/* --- 9. 输入区域 (保持不变) --- */
.input-area { padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); background-color: rgba(10, 7, 16, 0.5); flex-shrink: 0; }
.input-form { display: flex; align-items: center; gap: 1rem; }
.input-wrapper { flex-grow: 1; position: relative; }
.input-wrapper::before { content: ''; position: absolute; inset: -1px; border-radius: 20px; background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan)); transition: opacity 0.3s; opacity: 0; }
.input-wrapper:focus-within::before { opacity: 1; }
.input-form input { width: 100%; position: relative; z-index: 1; background-color: var(--bg-dark-2); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 20px; padding: 0.8rem 1.25rem; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box; }
.input-form input:focus { outline: none; border-color: transparent; }
.send-button { background: var(--accent-purple); border: none; color: white; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s ease; box-shadow: 0 0 15px rgba(113, 89, 193, 0.5); }
.send-button:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 0 25px rgba(113, 89, 193, 0.8); }
.send-button:disabled { background: #333; cursor: not-allowed; transform: scale(1); box-shadow: none; }
.send-button svg { width: 24px; height: 24px; }

/* --- 10. 错误提示 (保持不变) --- */
.error-banner { display: flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.5rem; background-color: var(--error-bg); border-top: 1px solid var(--error-border); border-bottom: 1px solid var(--error-border); color: #ffb8d0; font-size: 0.9rem; }

/* --- 11. 响应式布局 (保持不变) --- */
@media (max-width: 850px) { #chat-container { height: 100vh; width: 100%; border-radius: 0; border: none; } .header { flex-direction: column; align-items: stretch; gap: 1rem; } .custom-select { width: 100%; } }
</style>
