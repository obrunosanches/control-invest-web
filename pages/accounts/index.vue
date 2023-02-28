<script setup lang="ts">
import {storeToRefs} from "pinia";

import {AccountWithType, useAccountsStore} from "~/store/account";
import {useAccountTypesStore} from "~/store/accountType";
import {hide} from '~/plugins/modal';

type actionFormModalType = 'new' | 'edit'

const {fetchAccounts, createAccounts} = useAccountsStore()
const {fetchAccountTypes, createAccountType} = useAccountTypesStore()
const {accounts} = storeToRefs(useAccountsStore())
const {accountTypes} = storeToRefs(useAccountTypesStore())

const accountModalTarget: string = "accountModal"
const accountDeleteModalTarget: string = "accountDeleteModal"
const accountTypeModalTarget: string = "accountTypeModal"
const accountSelected = ref<AccountWithType | null>(null)
const actionFormModal = ref<actionFormModalType>('new')

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-show-modal', async () => {
    await fetchAccountTypes()
  })
})

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  if (form.getAttribute('id')?.includes('type')) {
    await createAccountType(formData)

    hide(accountTypeModalTarget)
    return void 0
  }

  await createAccounts(formData)

  form.reset()
  hide(accountModalTarget)
}

const selected = (item: AccountWithType | null) => {
  actionFormModal.value = item === null ? 'new' : 'edit'
  accountSelected.value = item
}
</script>

<template>
  <h1 class="text-gray-300 text-3xl font-bold">
    Contas
  </h1>

  <div class="flex justify-end">
    <base-button type="button" @click="selected(null)" v-show-modal="accountModalTarget">
      Adicionar
    </base-button>
  </div>

  <base-modal ref="modalElement" :target="accountModalTarget" position="top-center" class="mt-16">
    <base-modal-header :target="accountModalTarget" title="Cadastrar tipo de conta"/>
    <form id="account" novalidate @submit.prevent="handleSubmit">
      <base-modal-body :hasTitle="true">
        <div class="flex gap-4 items-end">
          <fieldset class="flex-auto">
            <form-input name="name" label="Nome" :value="accountSelected?.name"/>
          </fieldset>

          <fieldset class="flex-auto">
            <form-input name="initialBalance" label="Valor inicial" :value="accountSelected?.initialBalance"/>
          </fieldset>
        </div>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <form-select name="accountTypeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in accountTypes" :key="id" :value="id"
                      :selected="accountSelected?.accountTypeId === id">
                {{ description }}
              </option>
            </form-select>
          </fieldset>

          <base-button type="button" color="default" v-show-modal="accountTypeModalTarget">
            Tipo
          </base-button>
        </div>
      </base-modal-body>
      <base-modal-footer class="text-right">
        <base-button type="submit" color="default">
          Confirmar
        </base-button>
      </base-modal-footer>
    </form>
  </base-modal>

  <base-modal ref="modalElement" :target="accountTypeModalTarget" size="md" position="top-center" class="mt-16">
    <base-modal-header :target="accountTypeModalTarget" title="Cadastrar tipo de conta"/>
    <form id="account-type" novalidate @submit.prevent="handleSubmit">
      <base-modal-body :hasTitle="true">
        <fieldset>
          <form-input name="description" label="Descrição"/>
        </fieldset>
      </base-modal-body>
      <base-modal-footer class="text-right">
        <base-button type="submit" color="default">
          Confirmar
        </base-button>
      </base-modal-footer>
    </form>
  </base-modal>

  <base-table v-if="accounts?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Name</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in accounts" :key="item.name">
        <base-table-body-cell>
          {{ item.name }}
        </base-table-body-cell>
        <base-table-body-cell class="flex justify-end items-center gap-2">
          <span role="button" @click="selected(item)" class="bg-transparent" v-show-modal="accountModalTarget">
            <icons-edit-registtry-icon class="text-blue-600"/>
          </span>
          <span role="button" @click="selected(item)" class="bg-transparent" v-show-modal="accountDeleteModalTarget">
            <icons-remove-registtry-icon class="text-red-500"/>
          </span>
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>