<template>
    <div class="flex h-screen w-screen">
        <sideBar />
        <div class="w-[calc(100vw-296px)]">
            <TheHeader>
                {{ currentUser }}
            </TheHeader>
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import sideBar from './components/sideBar.vue';
import TheHeader from './components/theHeader.vue';
import { onMounted, ref } from "vue";
import { user } from './lib/stores/user';

const currentUser = ref(null)

onMounted(() => {
  user.init()
    .then(()=> currentUser.value = user.current.email)
});

</script>