<script setup lang="ts">
  import type {PostPropType} from "@/types/Types";

  defineProps<PostPropType>()

</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="py-4 text-white text-2xl">{{title}}</h1>
    <slot />
  </div>
</template>
