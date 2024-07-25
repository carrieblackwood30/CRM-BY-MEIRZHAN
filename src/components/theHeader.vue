<template>
    <div class="flex items-center justify-between h-[80px] font-bold border-b relative">
        <h1 class="text-2xl p-12">Web Forge</h1>
        <div class="flex items-center gap-2" v-if="user.current">
            <div class="flex gap-2 items-center">
                <slot></slot>
                <button class="bg-[#151135] h-8 p-2 w-8 rounded-full flex items-center justify-center hover:bg-[#292166]"
                    @click="user.logout()"
                    >
                    <img src="@/assets/img/icons/logout.svg" alt="" width="20">
                </button>
            </div>
        </div>
        <div  v-if="!user.current">
            <button @click="loginToggle = true">login</button>
            <login :toggle-login="loginToggle">
                <button @click="loginToggle = false">
                    <img src="@/assets/img/icons/arrow-up.svg" alt="" width="30">
                </button>
            </login>
        </div>
    </div>
</template>

<script setup>
import login from "@/components/login.vue"
import { user } from "@/lib/stores/user";
import { ref } from "vue";

const loginToggle = ref(false)
</script>
