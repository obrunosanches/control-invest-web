<template>
  <div
    class="h-screen grid grid-cols-1 md:grid-cols-[16rem,auto] grid-rows-[auto,auto,1fr,auto] md:grid-rows-[auto,1fr,auto]">
    <div class="md:col-span-2">
      <Navbar class="border-b border-gray-700">
        <div class="flex">
          <img src="./assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Control Money</span>
        </div>
      </Navbar>
    </div>

    <Sidebar className="bg-gray-800 border-r-0 md:border-r border-b md:border-b-0 border-gray-700" label="Sidebar">
      <SidebarItemGroup className="flex justify-around md:block space-y-0 md:space-y-2">
        <SidebarItem href="/">
          <template v-slot:before>
            <IconDashboard class="hidden md:block mr-3" />
          </template>
          Dashboard
        </SidebarItem>
        <SidebarItem href="/transactions">
          <template v-slot:before>
            <IconTransaction class="hidden md:block mr-3" />
          </template>
          Transações
        </SidebarItem>
        <SidebarItem href="/categories">
          <template v-slot:before>
            <IconCategory class="hidden md:block mr-3" />
          </template>
          <router-link to="/categories">Categorias</router-link>
        </SidebarItem>
        <SidebarItem href="/accounts">
          <template v-slot:before>
            <IconAccount class="hidden md:block mr-3" />
          </template>
          Contas
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>

    <main class="w-full p-5 text-white bg-gray-900">
      <router-view></router-view>
    </main>

    <div class="md:col-span-2">
      <div class="border-t border-gray-700 p-5">
        <a href="https://github.com/obrunosanches" target="_blank">
          <span class="text-gray-400 text-sm">Bruno Sanches &copy; 2023</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconDashboard from './components/Icons/IconDashboard.vue';
import IconCategory from './components/Icons/IconCategory.vue';
import IconAccount from './components/Icons/IconAccount.vue';
import IconTransaction from './components/Icons/IconTransaction.vue';

import Navbar from './components/TheNavbar.vue';
import Sidebar from './components/Sidebar/TheSidebar.vue';
import SidebarItemGroup from './components/Sidebar/TheSidebar.ItemGroup.vue';
import SidebarItem from './components/Sidebar/TheSidebar.Item.vue';
</script>
