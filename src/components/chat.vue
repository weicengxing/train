<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { marked } from 'marked';
import { vOnClickOutside } from '@vueuse/components';
import { useRoute } from 'vue-router';
import { Upload } from '@element-plus/icons-vue';

// ... script 部分与上一版完全相同，无需修改 ...
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
const imageFiles = ref([]); 
const imagePreviewUrls = ref([]); 
const fileInput = ref(null); 

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
    const response = await fetch('https://8e57-58-194-169-164.ngrok-free.app/api/models', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
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

const addImageFile = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    error.value = "检测到非图片文件，已跳过。";
    return;
  }
  if (imageFiles.value.some(f => f.name === file.name && f.size === file.size && f.name)) {
      return;
  }
  imageFiles.value.push(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreviewUrls.value.push(e.target.result);
  };
  reader.readAsDataURL(file);
};

const triggerFileInput = () => {
  fileInput.value.click();
};
const handleFileChange = (event) => {
  const files = event.target.files;
  if (!files) return;
  for (const file of files) {
    addImageFile(file);
  }
  if(fileInput.value) {
    fileInput.value.value = '';
  }
};

const handlePaste = (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;
  let imageFound = false;
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        addImageFile(file);
        imageFound = true;
      }
    }
  }
  if (imageFound) {
    event.preventDefault();
  }
};

const removeImage = (index) => {
  imageFiles.value.splice(index, 1);
  imagePreviewUrls.value.splice(index, 1);
};
const clearImages = () => {
  imageFiles.value = [];
  imagePreviewUrls.value = [];
  if(fileInput.value) {
    fileInput.value.value = '';
  }
};
const sendMessage = async () => {
  error.value = null;
  if ((!userInput.value.trim() && imageFiles.value.length === 0) || isLoading.value) return;

  if (!selectedModel.value) {
    error.value = '请先选择一个模型。';
    return;
  }

  let messageContent = [];
  messageContent.push({
    type: 'text',
    text: userInput.value || ' ' 
  });
  if (imageFiles.value.length > 0) {
    for (const url of imagePreviewUrls.value) {
      messageContent.push({
        type: 'image_url',
        image_url: {
          url: url 
        }
      });
    }
  }

  if(messageContent.length === 1 && !messageContent[0].text.trim()) return;

  conversationHistory.value.push({
    role: 'user',
    content: messageContent
  });
  
  userInput.value = '';
  clearImages();

  await nextTick();
  scrollToBottom();

  isLoading.value = true;
  conversationHistory.value.push({ role: 'assistant', content: '' });

  try {
    const response = await fetch('https://8e57-58-194-169-164.ngrok-free.app/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
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
const renderMarkdownForDisplay = (content) => {
  let textContent = '';
  const imageUrls = [];

  if (typeof content === 'string') {
    textContent = content;
  } else if (Array.isArray(content)) {
    for (const part of content) {
      if (part.type === 'text') {
        textContent = part.text;
      } else if (part.type === 'image_url') {
        imageUrls.push(part.image_url.url);
      }
    }
  }

  const textHtml = marked.parse(textContent || '', { gfm: true, breaks: true, smartLists: true });
  let imagesHtml = '';
  if (imageUrls.length > 0) {
    const imageTags = imageUrls.map(url => 
        `<img src="${url}" alt="User upload" class="user-message-image"/>`
    ).join('');
    imagesHtml = `<div class="user-message-image-container">${imageTags}</div>`;
  }
  
  return imagesHtml + textHtml;
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
              v-html="renderMarkdownForDisplay(message.content)">
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
      <transition name="preview-fade">
        <div v-if="imagePreviewUrls.length > 0" class="image-preview-container">
          <div v-for="(url, index) in imagePreviewUrls" :key="index" class="image-preview-item">
            <img :src="url" alt="Image preview" class="image-preview" />
            <button @click="removeImage(index)" class="remove-image-button">×</button>
          </div>
        </div>
      </transition>

      <form @submit.prevent="sendMessage" class="input-form">
        <button type="button" class="attach-button" @click="triggerFileInput" :disabled="isLoading">
        <el-icon color="#FF3333"><Upload /></el-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.5 10.5a.75.75 0 001.06 1.06l10.5-10.5a.75.75 0 011.06 0l1.5 1.5a.75.75 0 010 1.06l-6.75 6.75a2.25 2.25 0 01-3.182 0l-5.25-5.25a.75.75 0 00-1.06 1.06l5.25 5.25c2.22 2.22 5.854 2.22 8.074 0l6.75-6.75a2.25 2.25 0 000-3.182l-1.5-1.5z" clip-rule="evenodd" />
          </svg>
        </button>
        <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;" multiple />

        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="userInput" 
            placeholder="Initiate dialogue, describe image, or Ctrl+V to paste" 
            :disabled="isLoading" 
            autocomplete="off"
            @paste="handlePaste"
          />
        </div>
        
        <button type="submit" class="send-button" :disabled="isLoading || (!userInput.trim() && imageFiles.length === 0)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<style>
/* ... 其他所有CSS样式保持不变 ... */
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
.aurora-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; filter: blur(100px) saturate(1.5); }
.aurora-shape { position: absolute; border-radius: 50%; opacity: 0.6; }
.shape-1 { width: 500px; height: 500px; background: var(--accent-cyan); top: -150px; left: -150px; animation: move-aurora-1 25s infinite alternate; }
.shape-2 { width: 400px; height: 400px; background: var(--accent-magenta); bottom: -100px; right: -100px; animation: move-aurora-2 30s infinite alternate; }
.shape-3 { width: 300px; height: 300px; background: var(--accent-purple); bottom: 50%; right: 50%; transform: translate(50%, 50%); animation: move-aurora-3 20s infinite alternate; }
@keyframes move-aurora-1 { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(300px, 200px) rotate(180deg); } }
@keyframes move-aurora-2 { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(-400px, -150px) rotate(270deg); } }
@keyframes move-aurora-3 { from { transform: translate(50%, 50%) rotate(0deg); } to { transform: translate(150px, -150px) rotate(90deg); } }
#chat-container { width: 100%; max-width: 800px; height: 95vh; max-height: 900px; background-color: var(--bg-glass); backdrop-filter: blur(20px) saturate(120%); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; overflow: hidden; transition: all 0.3s ease; }
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
.chat-window { flex-grow: 1; overflow-y: auto; padding: 1.5rem; }
.chat-window::-webkit-scrollbar { width: 8px; }
.chat-window::-webkit-scrollbar-track { background: transparent; }
.chat-window::-webkit-scrollbar-thumb { background-color: var(--accent-purple); border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
.chat-window::-webkit-scrollbar-thumb:hover { background-color: var(--accent-cyan); }
.message-row { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 1.5rem; }
.sender-label { font-size: 0.8rem; font-weight: bold; margin-bottom: 0.4rem; padding-left: 0.5rem; opacity: 0.8; }
.sender-user { color: var(--accent-purple); }
.sender-assistant { color: var(--accent-cyan); }
.message-bubble { max-width: 90%; padding: 0.8rem 1.3rem; border-radius: 18px; line-height: 1.6; word-wrap: break-word; text-align: left; }
.user-bubble { background: var(--user-bubble-bg); color: #fff; border-top-left-radius: 4px; }
.assistant-bubble { background: var(--assistant-bubble-bg); color: var(--text-primary); border-top-left-radius: 4px; box-shadow: 0 0 15px rgba(0, 246, 255, 0.1); }
.message-fade-enter-active { transition: all 0.5s ease; }
.message-fade-enter-from { opacity: 0; transform: translateY(20px); }
.glowing-text-container { background: linear-gradient(90deg, var(--assistant-bubble-bg) 0%, var(--assistant-bubble-bg) 40%, var(--accent-cyan) 50%, var(--assistant-bubble-bg) 60%, var(--assistant-bubble-bg) 100%); background-size: 250% 100%; animation: gradient-scan 8s linear infinite; }
.glowing-text-container >>> * { -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 0 var(--text-primary), 0 0 5px rgba(0, 246, 255, 0.5), 0 0 10px rgba(0, 246, 255, 0.3); }
@keyframes gradient-scan { from { background-position: 100% 0; } to { background-position: -150% 0; } }
.message-bubble >>> p { margin-top: 0; margin-bottom: 1rem; }
.message-bubble >>> p:last-child { margin-bottom: 0; }
.message-bubble >>> ul, .message-bubble >>> ol { padding-left: 20px; margin-top: 0.5rem; margin-bottom: 1rem; }
.message-bubble >>> li { margin-bottom: 0.5rem; }
.message-bubble >>> a { color: var(--accent-cyan); text-decoration: none; border-bottom: 1px dotted var(--accent-cyan); transition: all 0.2s; }
.message-bubble >>> a:hover { text-shadow: 0 0 5px var(--accent-cyan); border-bottom-style: solid; }
.glowing-text-container >>> pre, .glowing-text-container >>> code { -webkit-background-clip: unset !important; background-clip: unset !important; color: var(--accent-magenta) !important; text-shadow: none !important; background-color: rgba(0,0,0,0.3); }
.glowing-text-container >>> pre { padding: 1rem; border-radius: 8px; }
.pulse-loader { width: 50px; height: 20px; position: relative; display: flex; align-items: center; justify-content: space-between; }
.pulse-loader:before, .pulse-loader:after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); animation: pulse-loader-anim 1s infinite alternate; }
.pulse-loader:after { animation-delay: 0.5s; }
@keyframes pulse-loader-anim { from { transform: scale(1); opacity: 1; } to { transform: scale(0.5); opacity: 0.5; } }
.error-banner { display: flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.5rem; background-color: var(--error-bg); border-top: 1px solid var(--error-border); border-bottom: 1px solid var(--error-border); color: #ffb8d0; font-size: 0.9rem; }
@media (max-width: 850px) { #chat-container { height: 100vh; width: 100%; border-radius: 0; border: none; } .header { flex-direction: column; align-items: stretch; gap: 1rem; } .custom-select { width: 100%; } }
.input-area {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem; 
  border-top: 1px solid var(--border-color); 
  background-color: rgba(10, 7, 16, 0.5); 
  flex-shrink: 0;
}
.input-form { display: flex; align-items: center; gap: 1rem; width: 100%; }
.input-wrapper { flex-grow: 1; position: relative; }
.input-wrapper::before { content: ''; position: absolute; inset: -1px; border-radius: 20px; background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan)); transition: opacity 0.3s; opacity: 0; }
.input-wrapper:focus-within::before { opacity: 1; }
.input-form input { width: 100%; position: relative; z-index: 1; background-color: var(--bg-dark-2); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 20px; padding: 0.8rem 1.25rem; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box; }
.input-form input:focus { outline: none; border-color: transparent; }
.send-button { background: var(--accent-purple); border: none; color: white; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s ease; box-shadow: 0 0 15px rgba(113, 89, 193, 0.5); }
.send-button:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 0 25px rgba(113, 89, 193, 0.8); }
.send-button:disabled { background: #333; cursor: not-allowed; transform: scale(1); box-shadow: none; }
.send-button svg { width: 24px; height: 24px; }
.attach-button {
  background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary);
  width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.3s ease;
}
.attach-button:hover:not(:disabled) { border-color: var(--accent-cyan); color: var(--accent-cyan); }
.attach-button:disabled { border-color: #333; color: #555; cursor: not-allowed; }
.attach-button svg { width: 24px; height: 24px; }
.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
  padding: 5px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 8px;
}
.image-preview-item {
  position: relative;
  width: 80px;
  height: 80px;
}
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}
.remove-image-button {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--error-border);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: 2;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
.preview-fade-enter-active, .preview-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.preview-fade-enter-from, .preview-fade-leave-to { opacity: 0; transform: scale(0.9); }
/* ----- 👇 修正后的图片显示样式 👇 ----- */

/* 1. 约束图片容器，这是最关键的一步！ */
/* 替换原有的 .user-message-image 样式 */
/* 在您的 <style> 标签中，找到并完全替换这两个部分： */

/* 1. 替换 .message-bubble >>> .user-message-image-container 样式 */
/* 方案1：基于面积统一（推荐） - 让所有图片占用相似的视觉空间 */
.message-bubble >>> .user-message-image {
  /* 设置一个目标面积，通过限制宽度和高度的乘积来统一视觉大小 */
  max-width: 200px !important;
  max-height: 200px !important;
  min-width: 120px !important;
  min-height: 120px !important;
  
  /* 让图片自动调整，保持比例 */
  width: auto !important;
  height: auto !important;
  
  /* 关键：使用 contain 保持比例，但添加背景确保统一的视觉框架 */
  object-fit: contain !important;
  
  /* 添加统一的背景框，让所有图片都有相同的"画布"大小 */
  background-color: rgba(26, 20, 35, 0.3) !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  
  /* 设置固定的显示框架，所有图片都会在这个框架内居中显示 */
  display: inline-block !important;
  box-sizing: border-box !important;
  
  /* 美化样式 */
  border-radius: 8px !important;
  border: 2px solid var(--accent-purple) !important;
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
  vertical-align: top !important;
  margin: 4px !important;
}

/* 方案2：如果您更希望所有图片都显示为相同的框架大小 */
.message-bubble >>> .user-message-image.uniform-frame {
  /* 固定框架大小 */
  width: 180px !important;
  height: 180px !important;
  
  /* 图片在框架内居中并等比缩放 */
  object-fit: contain !important;
  object-position: center !important;
  
  /* 背景和边框 */
  background-color: rgba(26, 20, 35, 0.5) !important;
  border-radius: 8px !important;
  border: 2px solid var(--accent-purple) !important;
  
  /* 其他样式 */
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
  display: inline-block !important;
  vertical-align: top !important;
  margin: 4px !important;
}

/* 方案3：智能调整 - 根据图片方向调整显示尺寸 */
/* 在您的 <style> 标签中，找到并完全替换这两个部分： */

/* 1. 替换 .message-bubble >>> .user-message-image-container 样式 */
.message-bubble >>> .user-message-image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 0.75rem;
  align-items: flex-start; /* 让不同高度的图片顶部对齐 */
}

/* 2. 完全替换 .message-bubble >>> .user-message-image 样式 */
.message-bubble >>> .user-message-image {
  /* 设置最大尺寸限制 */
  max-width: 250px !important;
  max-height: 250px !important;
  
  /* 设置最小尺寸，确保小图也能看清 */
  min-width: 120px !important;
  
  /* 让图片自动调整大小，保持比例 */
  width: auto !important;
  height: auto !important;
  
  /* 关键设置：等比缩放，不裁剪 */
  object-fit: contain !important;
  
  /* 背景和边框样式 */
  background-color: var(--bg-dark-2) !important;
  border-radius: 8px !important;
  border: 2px solid var(--accent-purple) !important;
  
  /* 交互效果 */
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
  
  /* 确保图片正确显示 */
  display: block !important;
  vertical-align: top !important;
}

/* 鼠标悬浮效果 */
.message-bubble >>> .user-message-image:hover {
  transform: scale(1.05) !important;
}

/* 如果上面的方法还是不生效，请尝试这个更强制的方式： */
#chat-container .message-bubble .user-message-image {
  max-width: 250px !important;
  max-height: 250px !important;
  min-width: 120px !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  background-color: var(--bg-dark-2) !important;
  border-radius: 8px !important;
  border: 2px solid var(--accent-purple) !important;
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
  display: block !important;
  vertical-align: top !important;
}

#chat-container .message-bubble .user-message-image:hover {
  transform: scale(1.05) !important;
}

#chat-container .message-bubble .user-message-image-container {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 12px !important;
  margin-bottom: 0.75rem !important;
  align-items: flex-start !important;
}
</style>