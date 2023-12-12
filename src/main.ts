import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'

import Card from "@/components/card/Card.vue";
import ActionList from "@/components/posts/ActionList.vue";
import ActionItem from "@/components/posts/ActionItem.vue";
import PostItem from "@/components/posts/PostItem.vue";
import Notification from "@/components/notification/Notification.vue";
import Post from "@/components/posts/Post.vue";
import Toast from "@/components/notification/Toast.vue";
import Layout from "@/layout/Layout.vue";
import Posts from "@/components/posts/Posts.vue";

const app = createApp(App)

app.component('Card', Card);
app.component('ActionList', ActionList);
app.component('ActionItem', ActionItem);
app.component('PostItem', PostItem);
app.component('Notification', Notification);
app.component('Posts', Posts);
app.component('Post', Post);
app.component('Toast', Toast);
app.component('Layout', Layout);

app.mount('#app')
