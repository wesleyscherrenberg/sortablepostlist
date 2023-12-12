<script setup lang="ts">
import {computed} from 'vue';
import IconAngleUp from "@/components/icons/IconAngleUp.vue";
import IconAngleDown from "@/components/icons/IconAngleDown.vue";
import type {ActionsType, PostItemPropType} from "@/types/Types";

const emit = defineEmits(['onSortChange'])

const props = withDefaults(defineProps<PostItemPropType>(), {
  showSortUp: true,
  showSortDown: true,
});

const postTitle = computed(() => `Post ${props.postId}`)

const onSortHandler = (isAsc: boolean) => {
  const action: ActionsType = {
    postId: props.postId,
    fromIndex: props.index,
    toIndex: isAsc ? props.index + 1 : props.index - 1
  }

  emit('onSortChange', action)
}

</script>

<template>
    <div class="flex justify-center items-center shadow rounded bg-white min-h-[6rem] transform transition-all duration-500">
      <div class="flex-1 p-3 self-center" data-test="postTitle">{{ postTitle }}</div>
      <div class="flex flex-col justify-between" data-test="sortButtons" v-if="showSortUp || showSortDown">
          <button v-if="showSortUp"
                  aria-label="sortUp"
                  role="button"
                  data-test="sortUp"
                  class="p-3 transform transition-all duration-200 hover:scale-110"
                  @click="onSortHandler(false)">
            <icon-angle-up class="fill-theme-primary" />
          </button>

          <button v-if="showSortDown"
                  aria-label="sortDown"
                  role="button"
                  data-test="sortDown"
                  class="p-3 transform transition-all duration-200 hover:scale-110"
                  @click="onSortHandler(true)">
            <icon-angle-down class="fill-theme-primary" />
          </button>
      </div>
    </div>
</template>
