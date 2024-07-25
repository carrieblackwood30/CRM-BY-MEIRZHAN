<template>
  <section class="absolute h-0 overflow-hidden transition-all duration-300 ease-in-out z-20 right-0 bg-white flex flex-col items-center" :class="toggleLogin ? 'border h-fit' : ''">
    <h1>Login or register</h1>
    <form class="flex flex-col gap-2">

      <input type="email" class="border rounded-lg" placeholder="Email" v-model="email" />
      <input type="password" class="border rounded-lg" placeholder="Password" v-model="password" />

      <div class="flex justify-evenly">
        <button type="button" class="border bg-[#151515] text-white px-2 rounded-lg" 
          :disabled="disabled" 
          @click="
              async function login(){
                disabled = true;
                await user.login(email, password),
                disabled = false;
              }
            ">
          Login
        </button>
        /
        <button type="button" class="border bg-[#151515] text-white px-2 rounded-lg" 
          :disabled="disabled" 
          @click="
              async function register(){
                disabled = true;
                await user.register(email, password),
                disabled = false;
              }
            ">
          Register
        </button>
      </div>
    </form>
    <slot></slot>
    <loader v-if="disabled" />
  </section>
</template>

<script setup>
import { user } from "@/lib/stores/user";
import { ref } from "vue";
import loader from "./UI/loader.vue";

const email = ref("");
const password = ref("");

const disabled = ref(false)

const props = defineProps({
  toggleLogin: Boolean
})
</script>