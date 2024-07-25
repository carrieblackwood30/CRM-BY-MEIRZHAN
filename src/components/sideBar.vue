<template>
    <div class="flex flex-col w-[280px] min-w-[100px] min-h-full bg-[#151135] text-white gap-1">
        <div class="bg-[#1e2631] flex items-center text-xl gap-2">
            <img src="../assets/img/logo.jfif" alt="" width="80">
            <h3>Web studio</h3>
        </div>

        <RouterLink to="/">
            <div class="flex items-center m-2 p-1 border-b transition-all duration-300 ease-in-out hover:bg-[#292366] cursor-pointer">
            <div class="rounded-full overflow-hidden p-2">
                <img src="../assets/img/icons/deal.svg" alt="deal" width="30">
            </div>
            <h3>Deals</h3>
        </div>
        </RouterLink>

        <RouterLink to="finishedDeals">
            <div class="flex items-center m-2 p-1 border-b transition-all duration-300 ease-in-out hover:bg-[#292366] cursor-pointer">
                <div class="rounded-full overflow-hidden p-2">
                    <img src="../assets/img/icons/finished-deal.svg" alt="deal" width="30">
                </div>
                <h3>Finished Deals</h3>
            </div>
        </RouterLink>

        <RouterLink to="chat">
            <div class="flex items-center m-2 p-1 border-b transition-all duration-300 ease-in-out hover:bg-[#292366] cursor-pointer">
                <div class="rounded-full overflow-hidden p-2">
                    <img src="../assets/img/icons/chat.svg" alt="deal" width="30">
                </div>
                <h3>Chat</h3>
            </div>
        </RouterLink>
   </div>
</template>

