<script lang="ts" setup>
import {computed, ref} from "vue";
import FormInput from "./FormInput.vue";
import {NewUser} from '../users'
import {validate, length, requied} from "../validation";
import { useUsers } from '../stores/users'
import { useModal } from "../composables/modal";

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [requied, length({min: 5, max: 10})]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [requied, length({min: 10, max: 40})]);
});

const isInvalid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers();
const modal = useModal()

async function handleSubmit() {
  if (isInvalid.value) return;
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }
  try {
     await usersStore.createUser(newUser); 
  } catch (error) {
    
  }
  password.value = ''
  username.value = ''
  modal.hideModal();
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="UserName" v-model="username" :type="'text'" :status="usernameStatus" />
    <FormInput name="Password" v-model="password" :type="'password'" :status="passwordStatus" />
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  margin-top: 50px;
  padding: 50px 48px;
  border-radius: 8px;
}

</style>