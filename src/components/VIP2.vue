<template>
  <div class="badge-container">
    <Nov4 />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nov4 from './Nov4.vue';

export default defineComponent({
  name: 'ParentComponent',
  components: { Nov4 }
});
</script>

<style scoped>
.badge-container {
  width: 500px; 
  /* Desired width */
  height: 328.57px;
   /* Maintain aspect ratio: 500 * (230 / 350) ≈ 328.57 */
  position: relative;
  display: flex;
  justify-content: left;
  align-items: left;
  overflow: visible; /* Ensure no clipping */
}

.badge-container .vip-badge {
  /* transform: scale(1.4286);  */
   transform: perspective(1500px) rotateX(15deg) rotateY(-15deg) scale(0.14286);;
  /* 500 / 350 ≈ 1.4286 */
  transform-origin: center;
}
</style>