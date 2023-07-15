<script lang="ts" setup>
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";
import { Post, TimelinePost } from "../posts";
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import { usePosts } from "../stores/posts";

const userStore = useUsers();
const router = useRouter();
const postsStore = usePosts();


if (!userStore.currentUserId) {
  throw Error('User was not found')
}


const post: TimelinePost = {
  id: "-1",
  authorId: userStore.currentUserId,
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
};

async function handleSubmit(post:Post) {
  await postsStore.createPost(post);
  router.push('/');
}
</script>

<template>
  <h1>Create a New Post</h1>
  <PostWriter :post="post" @submit="handleSubmit"/>
</template>
