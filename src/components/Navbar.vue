<script lang="ts" setup>
import { useModal } from '../composables/modal'

const modal = useModal();
</script>
<template>
  <div class="navber">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="modal.showModal">Sign Up</button>
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    Content to be rendered 2
  </Teleport>
</template>