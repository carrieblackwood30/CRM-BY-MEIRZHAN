<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)]">
        <div class="w-full h-full z-20 max-w-[500px] delay-1000 ml-auto"
            >
            <div class="bg-[#151135] px-12 py-6 rounded-t-xl relative flex flex-col gap-6 justify-center items-center">
                <slot></slot>
                <h3 class="text-white text-2xl">{{ companyName }}</h3>
            </div>
            <div class="bg-[#f3f3f3] h-full">
                <div class="border-b p-4">

                    <h1 class="text-2xl">Task: </h1>

                    <div class="flex items-center">
                        <h3 class="text-xl m-4 w-[200px]" :class="toggleChangeTask ? 'opacity-0' : ''">{{ description }}</h3>

                        <input type="text" 
                            class="absolute border border-blue-950 rounded-xl my-4" 
                            v-if="toggleChangeTask" 
                            placeholder="change task..."
                            v-model="changeTask"
                            >
                        <button 
                            class="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center" 
                            v-if="toggleChangeTask"
                            @click="updateDeal('description')"
                            >
                            <img src="@/assets/img/icons/save.svg" alt="" width="20">
                        </button>
                        <button
                            class="w-8 h-8 bg-blue-900 text-white rounded-full ml-2"
                            @click="toggleChangeTask = false"
                            v-if="toggleChangeTask"
                            >
                            X
                        </button>
                        
                        <button 
                            class="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center"
                            v-if="!toggleChangeTask"
                            @click="toggleChangeTask = true"
                            >
                            <img src="@/assets/img/icons/edit.svg" alt="" width="20">
                        </button>
                    </div>

                    <h1 class="text-2xl">Price: </h1>

                    <div class="flex items-center">
                        <h3 class="text-xl m-4 w-[200px]" :class="toggleChangePrice ? 'opacity-0' : ''">{{ Price }}</h3>

                        <input type="number" 
                            class="absolute border border-blue-950 rounded-xl my-4" 
                            v-if="toggleChangePrice" 
                            placeholder="change price..."
                            v-model="changePrice"
                            >
                        <button
                            class="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center" 
                            v-if="toggleChangePrice"
                            @click="updateDeal('Price')"
                            >
                            <img src="@/assets/img/icons/save.svg" alt="" width="20">
                        </button>
                        <button
                            class="w-8 h-8 bg-blue-900 text-white rounded-full ml-2"
                            @click="toggleChangePrice = false"
                            v-if="toggleChangePrice"
                            >
                            X
                        </button>
                        
                        <button 
                            class="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center"
                            v-if="!toggleChangePrice"
                            @click="toggleChangePrice = true"
                            >
                            <img src="@/assets/img/icons/edit.svg" alt="" width="20">
                        </button>
                    </div>

                </div>

                <div class="text-black text-2xl m-4">
                    <h1>Comments:</h1>
                    <div class="flex gap-2 items-center">
                        <input type="text" 
                            class="border border-blue-950 rounded-xl my-4" 
                            placeholder="write a comment"
                            v-model="comment"
                            >
                        <button 
                            class="bg-blue-900 text-white py-0.5 px-2 rounded-xl"
                            @click="addComment()"    
                            >add</button>
                    </div>

                    <div v-for="comment in comments.current">
                        <div v-if='comment.dealId === dealId'>
                            <h3>{{ comment.author }}</h3>
                            <h3>{{ comment.text }}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { databases } from "@/appwrite";
import { ideas } from "@/lib/stores/deals";
import { comments } from "@/lib/stores/comments";
import { IDEAS_COLLECTION_ID, IDEAS_DATABASE_ID } from "@/stores/database";
import { onMounted, ref } from "vue";
import { user } from "@/lib/stores/user";

const toggleChangeTask = ref(false)
const toggleChangePrice = ref(false)

const changeTask = ref(null)
const changePrice = ref(null)

const comment = ref(null)
const author = ref(null)

onMounted(async() => {
  user.init()
    .then(()=> author.value = user.current.email)
    await comments.init();
});

const props = defineProps({
    toggleSettings: Boolean,
    dealId: String,
    companyName: String,
    description: String,
    Price: Number
})

function updateDeal(target){

    if(target === 'Price'){
        databases.updateDocument(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            props.dealId,
            {
                Price: changePrice.value
            }).then(async() =>{
                await ideas.init()
            })
    }

    if(target === 'description'){
        databases.updateDocument(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            props.dealId,
            {
                description: changeTask.value
            }).then(async() =>{
                await ideas.init()
            })
    }

}

function addComment(){
    comments.add({
        text: comment.value,
        author: author.value,
        dealId: props.dealId
    })

    comment.value = ''
}

</script>