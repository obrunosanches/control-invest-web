<script setup lang="ts">
import Navbar from '~/components/TheNavbar.vue';
import Sidebar from '~/components/Sidebar/TheSidebar.vue';
import SidebarItemGroup from '~/components/Sidebar/TheSidebar.ItemGroup.vue';
import SidebarItem from '~/components/Sidebar/TheSidebar.Item.vue';
import DashboardIcon from '~/components/Icons/DashboardIcon.vue';
import TransactionIcon from '~/components/Icons/TransactionIcon.vue';
import CategoryIcon from '~/components/Icons/CategoryIcon.vue';
import AccountIcon from '~/components/Icons/AccountIcon.vue';
</script>

<template>
  <div
    class="h-screen bg-gray-900 grid grid-cols-1 md:grid-cols-[16rem,auto] grid-rows-[auto,auto,1fr,auto] md:grid-rows-[auto,1fr,auto]">
    <div class="md:col-span-2">
      <Navbar class="border-b border-gray-700">
        <div class="flex">
          <img src="~/assets/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo" />
          <span class="self-center text-white text-xl font-semibold whitespace-nowrap">Control Money</span>
        </div>
      </Navbar>
    </div>

    <Sidebar class="border-r-0 md:border-r border-b md:border-b-0 bg-gray-800 border-gray-700" aria-label="Sidebar">
      <SidebarItemGroup class="flex justify-around md:block space-y-0 md:space-y-2">
        <SidebarItem to="/">
          <template v-slot:before>
            <DashboardIcon class="hidden md:block mr-3" />
          </template>
          Dashboard
        </SidebarItem>

        <SidebarItem to="/transactions">
          <template v-slot:before>
            <TransactionIcon class="hidden md:block mr-3" />
          </template>
          Transações
        </SidebarItem>

        <SidebarItem to="/accounts">
          <template v-slot:before>
            <AccountIcon class="hidden md:block mr-3" />
          </template>
          Contas
        </SidebarItem>

        <SidebarItem to="/categories">
          <template v-slot:before>
            <CategoryIcon class="hidden md:block mr-3" />
          </template>
          Categorias
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
