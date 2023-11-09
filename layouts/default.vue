<script setup lang="ts">
useHead({
  title: 'Control Invest',
  bodyAttrs: {
    class: 'bg-slate-100 text-gray-600'
  }
})
</script>

<template>
  <div class="flex">
    <div class="shrink-0 w-48">
      <aside
          class="h-full w-48 fixed border-r bg-white border-black[0.07]"
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

    <main class="p-8 w-full max-w-screen-2xl mx-auto">
      <router-view></router-view>
    </main>
  </div>
</template>
