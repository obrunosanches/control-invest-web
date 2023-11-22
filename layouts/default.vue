<script setup lang="ts">
import { showModal } from "~/plugins/modal"

import { modalTransactionTarget } from "~/consts/transaction"

useHead({
  title: 'Control Invest',
  bodyAttrs: {
    class: 'bg-slate-100 text-gray-600'
  }
})
</script>

<template>
  <div class="flex">
    <div class="shrink-0 w-56">
      <aside
          class="h-full w-56 fixed border-r bg-white border-black[0.07]"
          aria-label="Sidebar"
      >
        <div class="flex justify-center py-4 mt-4">
          <img src="~/assets/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo"/>
          <span class="self-center text-xl font-semibold whitespace-nowrap">Control Invest</span>
        </div>

        <transaction-options @handle-click="() => showModal(modalTransactionTarget)" />

        <ul class="px-3 py-4 space-y-2">
          <sidebar-item route="/">
            <div class="flex gap-4">
              <icons-dashboard />
              Dashboard
            </div>
          </sidebar-item>
          <sidebar-item route="/transactions">
            <div class="flex gap-4">
              <icons-transaction />
              Transações
            </div>
          </sidebar-item>
          <sidebar-item route="/categories">
            <div class="flex gap-4">
              <icons-category />
              Categorias
            </div>
          </sidebar-item>
          <sidebar-item route="/accounts">
            <div class="flex gap-4">
              <icons-account />
              Contas
            </div>
          </sidebar-item>
        </ul>
      </aside>
    </div>

    <main class="p-8 w-full max-w-screen-2xl mx-auto">
      <router-view></router-view>
    </main>
  </div>

  <transaction-form-modal />
</template>
