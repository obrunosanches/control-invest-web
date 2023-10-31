<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { closeModal } from '~/plugins/modal'
import { useAccountTypesStore } from "~/store/accountType"
import { type AccountWithType, useAccountStore } from "~/store/account"

const accountTypesStore = useAccountTypesStore()
const accountStore = useAccountStore()

const { fetchAccountTypes } = accountTypesStore
const { fetchAccounts, createOrUpdateAccount } = accountStore

const { accountTypes } = storeToRefs(accountTypesStore)
const { accounts } = storeToRefs(accountStore)

const modalTarget = 'main-modal'
const accountFormId = 'account-form'
const accountSelected = ref<AccountWithType>(null)

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-show-modal', async () => {
    await fetchAccountTypes()
  })

  window.addEventListener('on-close-modal', () => {
    handleSelectAccount(null)
    reset(accountFormId)
  })
})

const accountTypesOptions = computed(() => accountTypes.value.map(item => ({
  value: item.id,
  label: item.description
})))

const handleSelectAccount = (account: AccountWithType) => {
  accountSelected.value = Object.assign({}, account)
}

const handleSubmit = async (payload): Promise<void> => {
  try {
    await createOrUpdateAccount({
      ...accountSelected.value,
      ...payload
    })
  } catch (error) {
    console.log(error)
  } finally {
    reset(accountFormId)
    closeModal(modalTarget)
  }
}
</script>

<template>
  <main class="p-5 w-full">
    <h1 class="text-gray-300 text-3xl font-bold">
      Contas
    </h1>

    <div class="flex justify-end">
      <form-kit
        type="button"
        label="Nova conta"
        @click="handleSelectAccount(null)"
        v-show-modal="modalTarget"
        input-class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
      />
    </div>

    <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-6">
      <div
        v-for="account in accounts"
        class="rounded-2xl bg-white p-8"
      >
        <header class="flex">
          <span class="flex-auto">{{ account.name }}</span>
          <div class="flex gap-4">
            <form-kit
              type="button"
              label="Editar"
              input-class="text-green-600"
              @click="handleSelectAccount(account)"
              v-show-modal="modalTarget"
            >
              Editar
            </form-kit>

            <form-kit
              type="button"
              label="Remover"
              input-class="text-red-600"
              @click="handleSelectAccount(account)"
              :ignore="false"
            />
          </div>
        </header>

        <div class="flex gap-4 mt-6">
          <div class="basis-1/3">
            <form-kit
              type="button"
              label="Adicionar receita"
              input-class="w-full bg-transparent border rounded p-3"
            />
          </div>
          <div class="basis-1/3">
            <form-kit
              type="button"
              label="Adicionar depesa"
              input-class="w-full bg-transparent border rounded p-3"
            />
          </div>
          <div class="basis-1/3">
            <form-kit
              type="button"
              label="Ver transações"
              input-class="w-full bg-transparent border rounded p-3"
            />
          </div>
        </div>
      </div>
    </div>
  </main>

  <client-only>
    <base-modal ref="modalElement" :target="modalTarget" class="mt-16">
      <template #header>
        <h3 class="text-xl font-medium text-white">
          Nova conta
        </h3>
        <form-kit
          type="button"
          v-close-modal="modalTarget"
          input-class="text-sm ml-auto flex items-center hover:text-gray-300 text-gray-50"
        >
          <icons-close class="h-4 w-4" viewBox="0 0 20 20" />
        </form-kit>
      </template>

      <template #body>
        <form-kit
          :id="accountFormId"
          type="form"
          :actions="false"
          @submit="handleSubmit"
          :incomplete-message="false"
          v-model="accountSelected"
        >
          <div class="p-6">
            <div class="flex gap-4 items-end">
              <form-input
                type="text"
                name="name"
                label="Nome"
                validation="required:trim"
              />
              <form-input
                type="text"
                name="initialBalance"
                label="Valor inicial"
              />
            </div>
            <div class="mt-6">
              <form-select
                name="accountTypeId"
                label="Tipo de conta"
                :options="[
                    { label: 'Selecione o tipo', value: ''},
                    ...accountTypesOptions,
                  ]"
                validation="required:trim"
              />
              <div class="error-message">
                <FormKitMessages :node="input?.name" />
              </div>
            </div>
          </div>

          <section class="p-6 rounded-b border-t border-gray-600 text-right">
            <form-kit
              type="submit"
              input-class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
              label="Confirmar"
            />
          </section>
        </form-kit>
      </template>
    </base-modal>
  </client-only>
</template>
