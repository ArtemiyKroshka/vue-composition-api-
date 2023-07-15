<script setup lang="ts">
import {TimelinePost} from "../posts";

defineProps<{
  post: TimelinePost;
}>();
</script>
<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a href="">{{ post.title }}</a>
    <div class="pl-2">{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>
