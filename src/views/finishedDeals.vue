<template>
    <h3 class="text-center text-3xl text-[#151135] font-bold m-8">Finished projects</h3>
    <div class="ml-auto items-center relative max-w-[500px] flex gap-8">
        <div>
            <h3 class="text-xl font-semibold">find:</h3>
            <input
                type="text" 
                class="w-full border border-[#151135] m-2" 
                placeholder="find a deal"
                v-model="findItem"
                @input="findItemFn()"
             >
        </div>
        <div>
            <h3 class=" text-xl font-semibold">filter:</h3>
            <div class="flex justify-center gap-4 m-2">
                <button 
                    class="bg-[#151135] text-white text-lg w-[100px]"
                    @click="filterDeals('name')"
                    :class="sortBy === 'name' ? 'bg-[#4739b1]' : ''"
                    >a-z</button>
                <button 
                    class="bg-[#151135] text-white text-lg w-[100px]"
                    @click="filterDeals('price')"
                    :class="sortBy === 'price' ? 'bg-[#4739b1]' : ''"
                    >price</button>
            </div>
        </div>
    </div>

    <div class="flex flex-wrap gap-8 m-8">
        <div v-for="deal in finishedDeals">
            <div class=" w-[300px] text-center">
                <div class="border cursor-pointer">
                    <h3 class="text-2xl text-white bg-[#151135] border-b p-2">{{ deal.name }}</h3>
                        <div class="flex flex-col">
                            <div>
                                <h3 class="text-xl text-blue-700">Description:</h3>
                                <h3 class="text-lg">{{ deal.description }}</h3>
                            </div>

                            <div>
                                <h3 class="text-xl text-blue-700">Price:</h3>
                                <h3 class="text-lg">{{ deal.Price }}</h3>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { ideas } from '@/lib/stores/deals';

const loaderRef = ref(true)
const sortBy = ref(null)
const findItem = ref()
const finishedDeals = ref()

onMounted(async() => {
  await ideas.init();
  loaderRef.value = false
  finishedDeals.value = ideas.current
});

function filterDeals(target){
    sortBy.value = target
    if(target === 'name'){
        ideas.current.sort((a, b) =>{
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        })
    }
    else if(target === 'price'){
        ideas.current.sort((a, b) =>{
            if(a.Price < b.Price) return -1
            if(a.Price > b.Price) return 1
            return 0
        })
    }
}

function findItemFn(){
    console.log(finishedDeals.value.filter(deal =>{
        return deal.name.toLowerCase().includes(findItem.value.toLowerCase())
    }))
}

</script>