<template>
    <div class="flex w-full m-4">
        <div class="grid grid-cols-4 gap-16">

            <div class="flex border min-w-[300px] flex-col min-h-[400px] relative" v-for="card in cards" @dragover="handleDragOver" @drop="() => handleDrop(card)">
                <h3 class="text-center bg-[#151135] text-white text-xl ">{{ card }}</h3>

                    <button v-if="card === 'new-project'"
                        @click="openAddModal = true"
                        class="border w-6 h-6 ml-auto mr-auto mt-4 rounded-full bg-[#151135] transition-all text-white hover:bg-[#292366]"
                        >
                        +
                    </button>

                    <form 
                        @submit.prevent="addDeal()"
                        v-if="card === 'new-project'"
                        class="flex gap-1 flex-col items-center max-w-[200px] ml-auto mr-auto transition-all duration-300 ease-in-out h-0 my-2 overflow-hidden"
                        :class="openAddModal ? 'h-full' : ''"
                        >
                        <label for="company">Company: </label>
                        <input type="text" v-model="dealCompany" id="company" placeholder="name" class="border border-[#151515] rounded-lg" required>
                        <label for="description">Description: </label>
                        <input type="text" v-model="dealDescription" id="description" placeholder="project" class="border border-[#151515] rounded-lg" required>
                        <label for="price">Price: </label>
                        <input type="number" v-model="dealPrice" id="price" placeholder="price" class="border border-[#151515] rounded-lg" required>
                        <button class="bg-[#151515] text-white px-4 rounded-lg m-4">add</button>
                        <button 
                            type="button" 
                            class="bg-[#151515] rounded-full"
                            @click="openAddModal = false"
                            >
                            <img src="@/assets/img/icons/arrow-up.svg" alt="" width="30">
                        </button>
                    </form>
                    
                    <div v-if="loader" class="absolute top-16">loading...</div>

                    <div v-for="deal in ideas.current"
                        draggable="true"
                        class="cursor-grab"
                        @dragstart="handleDragStart(deal, card)"
                        >
                        <div v-if="deal.status === card" class="border-b mb-4" @dblclick="openSettingsModal(deal, getStatusColor(deal.status))">
                            <h1 :class="getStatusColor(deal.status)" class="text-xl text-center text-white">{{ deal.name }}</h1>
                            <h4>{{ deal.description }}</h4>
                            <h4>{{ deal.Price }}</h4>
                        </div>

                    </div>
            </div>
            <moduleSidebar 
                v-if="toggleSettings"
                :companyName="modalCompanyName"
                :description="modalCompanyDescription"
                :Price="modalCompanyPrice"
                :toggleSettings="toggleSettings"
                :color="getStatusColor()"
                :dealId="modalDealId"
                >
                <button 
                    @click="toggleSettings = false" 
                    class="absolute left-4 top-4 text-2xl bg-white w-8 h-8 rounded-full text-[#151515]"
                    > x 
                </button>
            </moduleSidebar>
        </div>
    </div>  


</template>

<script setup>
import { ideas } from '@/lib/stores/deals';
import { onMounted, ref } from 'vue';
import { databases } from "@/appwrite";
import { IDEAS_DATABASE_ID } from '@/stores/database';
import { IDEAS_COLLECTION_ID } from '@/stores/database';

import moduleSidebar from '@/views/moduleSidebar.vue'

const openAddModal = ref(false)
const toggleSettings = ref(false)

const loader = ref(true)
const dragCardRef = ref(null)
const sourceColumnRef = ref(null)

const dealCompany = ref(null)
const dealDescription = ref(null)
const dealPrice = ref(null)

const modalCompanyName = ref(null)
const modalCompanyDescription = ref(null)
const modalCompanyPrice = ref(null)
const modalDealId = ref(null)

const cards = ["new-project", "to-be-agreed", "in-process", "done"]

onMounted(async() => {
  await ideas.init();
  loader.value = false
});

function handleDragStart(deal, card){
    dragCardRef.value = deal
    sourceColumnRef.value = card 
}

function handleDragOver(event){
    event.preventDefault()
}

function handleDrop(targetColumn){
    if(dragCardRef.value && sourceColumnRef.value){
        updateDeal(targetColumn)
    }
}

function updateDeal(targetColumn){
    databases.updateDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        dragCardRef.value.$id,
        {
            status: targetColumn
        }
    ).then(async() =>{
        await ideas.init()
    })
}

function addDeal(){
    ideas.add({
        name: dealCompany.value,
        description: dealDescription.value,
        Price: dealPrice.value,
    })

    dealCompany.value = ''
    dealDescription.value = ''
    dealPrice.value = ''
}

function getStatusColor(dealColumn){
    if(dealColumn === 'new-project') return 'bg-green-500'
    else if(dealColumn === 'to-be-agreed') return 'bg-red-500'
    else if(dealColumn === 'in-process') return 'bg-blue-500'
    else if(dealColumn === 'done') return 'bg-yellow-500'
}

function openSettingsModal(deal){
    toggleSettings.value = true

    modalCompanyName.value = deal.name
    modalCompanyDescription.value = deal.description
    modalCompanyPrice.value = deal.Price
    modalDealId.value = deal.$id
}
</script>