<template>
  <div class="auto-login-container">
    <div v-if="loading">正在自动登录...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AutoLogin',
  setup() {
    const loading = ref(true);
    const error = ref('');
    const router = useRouter();

    const autoLogin = () => {
      // 创建隐藏的 iframe 来执行自动登录
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'https://52chatgpt.top/';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          
          if (!iframeDoc) {
            throw new Error('无法访问 iframe 内容');
          }

          // 定位输入框并设置值
          const authInput = iframeDoc.getElementById('authCode') as HTMLInputElement;
          if (authInput) {
            authInput.value = 'freeuseforall';
          }

          // 定位登录按钮并点击
          const loginBtn = iframeDoc.getElementById('loginBtn') as HTMLButtonElement;
          if (loginBtn) {
            loginBtn.click();
            
            // 等待登录完成
            setTimeout(() => {
              // 获取登录后的 URL
              const loggedInUrl = iframe.contentWindow?.location.href;
              if (loggedInUrl) {
                // 在新标签页打开登录后的页面
                window.open(loggedInUrl, '_blank');
                router.back(); // 返回上一页
              }
            }, 3000);
          } else {
            throw new Error('未找到登录按钮');
          }
        } catch (e) {
          error.value = `自动登录失败: ${(e as Error).message}`;
          console.error(e);
        } finally {
          loading.value = false;
          document.body.removeChild(iframe);
        }
      };
    };

    onMounted(() => {
      autoLogin();
    });

    return { loading, error };
  }
});
</script>

<style scoped>
.auto-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.error-message {
  color: #f56c6c;
  font-size: 18px;
}
</style> 