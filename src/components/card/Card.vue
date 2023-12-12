<script setup lang="ts">

import type {CardPropType} from "@/types/Types";

defineProps<CardPropType>();
</script>

<template>
  <section>
    <div class="rounded bg-white shadow overflow-hidden">
      <div data-test="title" class="p-4 bg-white font-bold text-lg">{{ title }}</div>
      <div class="bg-theme-light p-4" data-test="body">
        <slot />
      </div>
    </div>
  </section>
</template>
