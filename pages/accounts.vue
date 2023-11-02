<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { closeModal, showModal } from '~/plugins/modal'
import { useAccountTypesStore } from "~/store/accountType"

import { type AccountWithType, useAccountStore } from "~/store/account"
import type { AccountActionType } from "~/types/accounts"

import CardList from "~/pages/components/Accounts/CardList.vue"

const accountTypesStore = useAccountTypesStore()
const accountStore = useAccountStore()

const { fetchAccountTypes } = accountTypesStore
const { fetchAccounts, createOrUpdateAccount, deleteAccount } = accountStore

const { accountTypes } = storeToRefs(accountTypesStore)
const { accounts } = storeToRefs(accountStore)

const modalTarget = 'main-modal'
const accountFormId = 'account-form'
const accountSelected = ref<AccountWithType>(null)
const accountAction = ref<AccountActionType>('create')

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-show-modal', async () => {
    await fetchAccountTypes()
  })

  window.addEventListener('on-close-modal', () => {
    handleSelectAccount(null, 'create')
    reset(accountFormId)
  })
})

const accountTypesOptions = computed(() => accountTypes.value.map(item => ({
  value: item.id,
  label: item.description
})))

const handleSelectAccount = (account: AccountWithType, action: AccountActionType) => {
  accountSelected.value = Object.assign({}, account)
  accountAction.value = action

  showModal(modalTarget)
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
    closeModal(modalTarget)
  }
}

const handleDeleteAccount = async (): Promise<void> => {
  await deleteAccount(accountSelected.value.id)
  closeModal(modalTarget)
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
        @click="handleSelectAccount(null, 'create')"
        input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
      />
    </div>

    <card-list
      :accounts="accounts"
      @handle-click="handleSelectAccount"
    />
  </main>

  <client-only>
    <base-modal
      ref="modalElement"
      :target="modalTarget"
      :title="accountAction !== 'delete' ? 'Nova conta': null"
      class="mt-16"
    >
      <template #body>
        <section v-if="accountAction !== 'delete'">
          <form-kit
            :id="accountFormId"
            type="form"
            :actions="false"
            @submit="handleSubmit"
            :incomplete-message="false"
            v-model="accountSelected"
            #default="{ value }"
          >
            <div class="p-6">
              <div class="flex gap-4 items-end">
                <form-input
                  name="name"
                  label="Nome"
                  validation="required:trim"
                />
                <form-input
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
                input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
                label="Confirmar"
              />
            </section>
          </form-kit>
        </section>

        <section class="p-6 text-center" v-if="accountAction === 'delete'">
          <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>

          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Tem certeza que deseja excluir: "{{ accountSelected?.name }}"?
          </h3>

          <div class="flex justify-center gap-4">
            <form-kit
              type="button"
              label="Confirmar"
              input-class="bg-red-600 hover:bg-red-800 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
              @click="handleDeleteAccount()"
            />

            <form-kit
              type="button"
              label="Cancelar"
              v-close-modal="modalTarget"
              input-class="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-2.5 px-5 font-medium rounded-lg text-sm border border-gray-500"
            />
          </div>
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
