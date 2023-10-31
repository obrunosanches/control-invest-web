<script setup lang="ts">
import { storeToRefs } from "pinia"
import type { Account } from "@prisma/client"
import { reset } from "@formkit/core"

import { closeModal } from '~/plugins/modal'
import { useAccountTypesStore } from "~/store/accountType"
import { type AccountWithType, useAccountStore } from "~/store/account"

const accountTypesStore = useAccountTypesStore()
const accountStore = useAccountStore()

const { fetchAccountTypes } = accountTypesStore
const { fetchAccounts, createAccount } = accountStore

const { accountTypes } = storeToRefs(accountTypesStore)
const { accounts } = storeToRefs(accountStore)

const modalTarget = 'main-modal'
const accountFormId = 'account-form'
const accountSelected = ref<AccountWithType | null>(null)

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
    if (payload?.id) {
      return void 0
    }

    await createAccount({
      name: payload.name,
      initialBalance: Number(payload.initialBalance || 0),
      accountTypeId: payload.accountTypeId
    } as Account)
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
        v-show-modal="modalTarget"
        input-class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
      />
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
</template>
