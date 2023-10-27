<script setup lang="ts">
useHead({
  title: 'Control Invest',
  bodyAttrs: {
    class: 'bg-gray-900'
  }
})
</script>

<template>
  <div class="h-screen flex">
    <div class="shrink-0 w-48">
      <aside
          class="h-full w-48 fixed border-r border-b-0 bg-gray-800 border-gray-700"
          aria-label="Sidebar"
      >
        <ul class="px-3 py-4 space-y-2">
          <sidebar-item route="/">
            Dashboard
          </sidebar-item>
          <sidebar-item route="/transactions">
            Transações
          </sidebar-item>
          <sidebar-item route="/categories">
            Categorias
          </sidebar-item>
          <sidebar-item route="/accounts">
            Contas
          </sidebar-item>
        </ul>
      </aside>
    </div>

    <main class="p-5 w-full">
      <router-view></router-view>
    </main>
  </div>
</template>
