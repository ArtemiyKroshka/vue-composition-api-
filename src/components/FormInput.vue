<script lang="ts" setup>
defineProps<{
  name: string;
}>();


</script>

<template>
  <div class="field">
    <label :for="name" class="label"> {{ name }}</label>
    <div class="control">
      <input type="text" :id="name" class="input">
    </div>
  </div>
</template>
