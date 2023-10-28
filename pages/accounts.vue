<script setup lang="ts">
import { storeToRefs } from "pinia"

import { hide } from '~/plugins/modal'
import { useAccountTypesStore } from "~/store/accountType"
import { type AccountWithType, useAccountStore } from "~/store/account"

const accountTypesStore = useAccountTypesStore()
const accountStore = useAccountStore()

const { fetchAccountTypes } = accountTypesStore
const { fetchAccounts, createAccount } = accountStore

const { accountTypes } = storeToRefs(accountTypesStore)
const { accounts } = storeToRefs(accountStore)

const modalTarget = 'main-modal'
const accountSelected = ref<AccountWithType | null>(null)

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-show-modal', async () => {
    await fetchAccountTypes()
  })
})

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  await createAccount(formData)

  form.reset()
  hide(modalTarget)
}
</script>

<template>
  <main class="p-5 w-full">
    <h1 class="text-gray-300 text-3xl font-bold">
      Contas
    </h1>

    <div class="flex justify-end">
      <button
          class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          v-show-modal="modalTarget"
      >
        Nova conta
      </button>
    </div>

    <div v-for="{ name } in accounts">
      <span class="text-white">{{ name }}</span>
    </div>
  </main>

  <base-modal ref="modalElement" :target="modalTarget" class="mt-16">
    <template #header>
      <h3 class="text-xl font-medium text-white">
        Nova conta
      </h3>
      <button
          type="button"
          v-hide-modal="modalTarget"
          class="text-sm ml-auto flex items-center hover:text-gray-300 text-gray-50"
      >
        <icons-close class="h-4 w-4" viewBox="0 0 20 20" />
      </button>
    </template>

    <template #body>
      <form id="account-type" novalidate @submit.prevent="handleSubmit">
        <div class="p-6">
          <div class="flex gap-4 items-end">
            <fieldset class="flex-auto">
              <form-input name="name" label="Nome" />
            </fieldset>
            <fieldset class="flex-auto">
              <form-input name="initialBalance" label="Valor inicial" />
            </fieldset>
          </div>
          <div class="mt-6">
            <form-select name="accountTypeId" label="Tipo de conta">
              <option selected>Selecione o tipo</option>
              <option
                v-for="{ id, description } in accountTypes"
                :key="id"
                :value="id"
                :selected="accountSelected?.accountTypeId === id"
              >
                {{ description }}
              </option>
            </form-select>
          </div>
        </div>

        <section class="p-6 rounded-b border-t border-gray-600 text-right">
          <button
              class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
              type="submit"
          >
            Confirmar
          </button>
        </section>
      </form>
    </template>
  </base-modal>
</template>
