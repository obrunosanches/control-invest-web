<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { closeModal, showModal } from '~/plugins/modal'
import { useAccountTypesStore } from "~/store/accountType"

import { type AccountWithType, useAccountStore } from "~/store/account"
import type { ItemActionType } from "~/types"

import ConfirmDelete from "~/components/ConfirmDelete.vue"

const accountTypesStore = useAccountTypesStore()
const accountStore = useAccountStore()

const { fetchAccountTypes } = accountTypesStore
const { fetchAccounts, createOrUpdateAccount, deleteAccount } = accountStore

const { accountTypes } = storeToRefs(accountTypesStore)
const { accounts } = storeToRefs(accountStore)

const modalTarget = 'main-modal'
const accountFormId = 'account-form'
const accountSelected = ref<AccountWithType>(null)
const accountAction = ref<ItemActionType>('create')

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

const handleSelectAccount = (account: AccountWithType, action: ItemActionType) => {
  accountSelected.value = Object.assign({}, account)
  accountAction.value = action

  showModal(modalTarget)
}

const handleDeleteAccount = async (): Promise<void> => {
  await deleteAccount(accountSelected.value.id)
  closeModal(modalTarget)
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
</script>

<template>
  <client-only>
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

    <account-list
      :accounts="accounts"
      @handle-click="(account, action) => handleSelectAccount(account, action)"
    />

    <base-modal
      ref="modalElement"
      :target="modalTarget"
      :title="accountAction !== 'delete' ? 'Nova conta': null"
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
              <div class="flex gap-4">
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
                    { label: 'Selecione o tipo', value: '' },
                    ...accountTypesOptions,
                  ]"
                  validation="required:trim"
                />
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
          <confirm-delete
            :name="accountSelected?.name"
            @handle-click="action => action === 'confirm' ? handleDeleteAccount() : closeModal(modalTarget)"
          />
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
