<script setup lang="ts">
import IconCheck from "@/components/icons/IconCheck.vue";
import IconError from "@/components/icons/IconError.vue";
import {ref, watchEffect} from "vue";
import IconHappy from "@/components/icons/IconHappy.vue";
import type {ToastPropType} from "@/types/Types";

const props = withDefaults(defineProps<ToastPropType>(), {
  message: '',
  variant: 'info',
  duration: 5000
})

const showToast = ref(false)

watchEffect(() => {
  if (props.message) {
    showToast.value = true;
    setTimeout(() => showToast.value = false, props.duration);
  }
})

</script>

<template>
  <teleport to="body">
    <div v-if="showToast" class="fixed z-50 top-3 right-3 flex gap-2 flex-col">
      <div :class="variant" class="flex items-center rounded p-4 shadow ml-3">
        <IconCheck v-if="variant === 'success'" class="fill-white" />
        <IconError v-else-if="variant === 'error'" class="fill-white" />
        <IconHappy v-else-if="variant === 'info'" class="fill-theme-primary" />
        <div class="ml-2">{{message}}</div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.success {
  @apply bg-theme-success text-white
}

.error {
  @apply bg-theme-danger text-white
}

.info {
  @apply border border-theme-primary bg-white
}
</style>
