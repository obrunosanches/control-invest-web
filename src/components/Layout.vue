<script setup lang='ts'>
import { computed } from 'vue';
import classNames from 'classnames';

import Navbar from './Navbar.vue';
import Sidebar from './Sidebar/Sidebar.vue';
import SidebarItemGroup from './Sidebar/Sidebar.ItemGroup.vue';
import SidebarItem from './Sidebar/Sidebar.Item.vue';

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const layoutClasses = computed(() => {
  return classNames(
    props.className
  )
})
</script>

<template>
  <div :class="layoutClasses">
    <Navbar sticky>
      <div class="flex">
        <img src="../assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Control Money</span>
      </div>
    </Navbar>

    <div class="flex h-full pt-14">
      <Sidebar className="h-full fixed top-14 left-0 w-64 hidden md:block border-r border-gray-700" label="Sidebar">
        <SidebarItemGroup className="space-y-2">
          <SidebarItem href="#">
            <svg aria-hidden="true" class="mr-3 flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-white"
              stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            Transações
          </SidebarItem>
          <SidebarItem href="#">
            <svg aria-hidden="true" class="mr-3 flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-white"
              stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            Categorias
          </SidebarItem>
          <SidebarItem href="#">
            <svg aria-hidden="true" class="mr-3 flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-white"
              stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
            Contas
          </SidebarItem>
        </SidebarItemGroup>
      </Sidebar>

      <main class="w-full ml-64 p-5 text-white bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>