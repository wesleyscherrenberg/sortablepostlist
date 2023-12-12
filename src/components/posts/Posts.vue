<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {fetchPosts} from "@/services/apiService.js";
import type {ActionsType, PostsPropType, PostsType} from "@/types/Types";

const INFO = 'info';
const ERROR = 'error';

const props = defineProps<PostsPropType>()

const actions = ref<ActionsType[]>([])
const posts = ref<PostsType[]>([])
const toastMessage = ref('');
const toastVariant = ref(INFO);

const fetchData = async () => {
  try {
    const data = await fetchPosts();
    posts.value = props.limit ? data.slice(0, props.limit) : data;

    const postLabel = posts.value.length === 1 ? 'post' : 'posts'

    toastMessage.value = `Hello! I have provided ${posts.value.length} ${postLabel} for you to sort.`;
    toastVariant.value = INFO;

  } catch (err) {
    let message = 'There was an error loading the posts. Please try again later.';

    if(err instanceof Error) {
      message = err.message
    }
    toastMessage.value = message;
    toastVariant.value = ERROR;

  }
}

const sortPosts = (postId: number, toIndex: number) => {
  const _posts = [...posts.value]
  const postIndex = _posts.findIndex((post) => post.id === postId)
  const currentPost = _posts.splice(postIndex, 1)[0]
  _posts.splice(toIndex, 0, currentPost)
  posts.value = _posts
}

const onSortChange = (action: ActionsType) => {
  actions.value.unshift(action)
  sortPosts(action.postId, action.toIndex)
}

const onTimeTravelChange = (action: ActionsType) => {
  const actionIndex = actions.value.indexOf(action);
  if (actionIndex < 0) return;

  actions.value.slice(0, actionIndex + 1)
      .forEach(action => sortPosts(action.postId, action.fromIndex));

  actions.value = actions.value.slice(actionIndex + 1);

}

onBeforeMount(fetchData);

</script>

<template>
  <Post :title="'Sortable Post List'">
    <transition-group v-if="posts.length" class="flex flex-col gap-4" name="list" tag="div">
      <PostItem
          v-for="(post, index) in posts"
          :key="post.id"
          :index="index"
          :postId="post.id"
          :showSortUp="index > 0"
          :showSortDown="index < posts.length - 1"
          @onSortChange="onSortChange"
      />
    </transition-group>
    <Notification v-else
                  icon="sad"
                  :text="'There a no post available at this moment'"/>
  </Post>

  <Card :title="'List of actions commited'">
    <ActionList v-if="actions.length">
      <ActionItem
          v-for="(action, index) in actions"
          :key="index"
          :action="action"
          :btn-text="'Time travel'"
          @onTimeTravelChange="onTimeTravelChange"
      />
    </ActionList>
    <Notification v-else
                  icon="info"
                  :text="'Please sort a post in the Sortable Post List'"/>
  </Card>

  <Toast :message="toastMessage" :variant="toastVariant" />
</template>
