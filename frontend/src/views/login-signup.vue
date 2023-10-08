<template>
  <div>
    <a href="/">
      <img w-14em :src="logoURL" alt="" />
    </a>
    <h1>{{ name }}</h1>
    <form @submit="submit">
      <h3>
        {{ signup ? "Sign Up" : "Login" }}
      </h3>

      <div v-if="error !== ''" class="wrong">{{ error }}</div>
      
      <div>
        <div i-mdi:mail></div>
        <input input-shortcut
          type="text"
          v-model="email"
          placeholder="email"
        />
      </div>

      <div>
        <div i-mdi:password></div>
        <input input-shortcut
          type="password"
          v-model="password"
          placeholder="password"
        />
      </div>


      <div v-if="signup">
        <div i-mdi:password-outline></div>
        <input input-shortcut
          type="password"
          v-model="passwordConfirm"
          placeholder="passwordConfirm"
        />
      </div>

      <input input-shortcut
        type="submit"
        :value="signup ? 'submit signup' : 'submit login'"
      />

      <p @click="toggleMode" underline cursor-pointer>
        {{ signup ? "Login Instead" : "Sign Up" }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import * as auth from "../utils/api";
import config from "../config";

const router = useRouter()
const route = useRoute()

let { name, logoURL } = config;

let error = ref("");
let email = ref("");
let password = ref("");
let passwordConfirm = ref("");

let signup = ref(false);

function toggleMode() {
  signup.value = !signup.value;
}

async function submit(event) {
  event.preventDefault();
  event.stopPropagation();

  let redirect = route.query.redirect;
  if (redirect === "" || redirect === undefined || redirect === null) {
    redirect = "/";
  }

  if ( signup.value ) {
    if (password.value !== passwordConfirm.value) {
      error.value = "Password Confirm Doesn't Match";
      return;
    }
  }

  try {
    if ( signup.value===true ) {
      await auth.signup(email.value, password.value);
    }
    await auth.login(email.value, password.value);
    console.log('redirect',redirect);
    router.push({ path: redirect });
  } catch (e) {
    console.log(e)
    error.value = e.message;
  }
}
</script>
