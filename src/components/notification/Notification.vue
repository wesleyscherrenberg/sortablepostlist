<script setup lang="ts">
import IconInfo from "@/components/icons/IconInfo.vue";
import IconError from "@/components/icons/IconError.vue";
import IconSad from "@/components/icons/IconSad.vue";
import type {NotificationPropType} from "@/types/Types";

defineProps<NotificationPropType>();

</script>

<template>
  <div class="p-4 flex items-center gap-2 bg-white rounded shadow" :class="variant">
    <IconInfo class="fill-theme-primary w-9 h-9" :class="{iconPositionRight: 'order-1'}" v-if="icon === 'info'" />
    <IconError class="fill-red-500 w-9 h-9" :class="{iconPositionRight: 'order-1'}" v-else-if="icon === 'error'" />
    <IconSad class="fill-theme-primary w-9 h-9" :class="{iconPositionRight: 'order-1'}" v-else-if="icon === 'sad'" />
    {{text}}
  </div>
</template>

<style scoped>
.primary {
  @apply bg-theme-primary text-white
}

.secondary {
  @apply bg-theme-secondary
}

.light {
  @apply bg-theme-light
}
</style>
