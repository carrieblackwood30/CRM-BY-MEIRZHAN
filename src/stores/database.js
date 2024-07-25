import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { databases } from "../appwrite"
export const IDEAS_DATABASE_ID = "66a0a597003e7dfdb051"
export const IDEAS_COLLECTION_ID = "66a0a5a70028baa9fb07"

export const useDealsStore = defineStore('deals', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
