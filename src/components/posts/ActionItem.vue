<script setup lang="ts">
import {computed} from "vue";
import type {ActionItemProp, ActionsType} from "@/types/Types";

const emit = defineEmits(['onTimeTravelChange'])

const props = defineProps<ActionItemProp>()

const onTimeTravelHandler = (action: ActionsType) => {
  emit('onTimeTravelChange', action)
}

const itemText = computed(() => {
  return `Moved post ${props.action.postId} from index ${props.action.fromIndex} to index ${props.action.toIndex}`
})
</script>

<template>
  <div class="p-4 flex items-center border-b border-theme-light last:border-none transform transition-all duration-500">
    <p class="flex-1" data-test="itemText">{{itemText}}</p>
    <button @click="onTimeTravelHandler(action)"
            aria-label="onTimeTravelBtn"
            role="button"
            data-test="onTimeTravelBtn"
            class="p-4 bg-theme-secondary py-3 px-4 flex-none rounded ">
      {{btnText}}
    </button>
  </div>
</template>
