<template>
  <div class="h-screen grid grid-cols-1 md:grid-cols-[16rem,auto] grid-rows-[auto,auto,1fr,auto] md:grid-rows-[auto,1fr,auto]">
    <div class="md:col-span-2">
      <Navbar class="border-b border-gray-700">
        <div class="flex">
          <img src="./assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Control Money</span>
        </div>
      </Navbar>
    </div>

    <Sidebar className="bg-gray-800 border-r-0 md:border-r border-b md:border-b-0 border-gray-700" label="Sidebar">
      <span class="text-white">Sidebar</span>
    </Sidebar>
    <main class="w-full p-5 text-white bg-gray-900">
      <router-view></router-view>
    </main>

    <div class="md:col-span-2">
      <div class="border-t border-gray-700 p-5">
        <span class="text-white">Footer</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/TheNavbar.vue';
import Sidebar from './components/Sidebar/TheSidebar.vue';
</script>
