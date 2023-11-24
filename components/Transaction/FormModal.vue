<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { useAccountStore } from "~/store/account"
import { useTransactionStore } from "~/store/transaction"
import { useTransactionTypeStore } from "~/store/transactionType"
import { useCategoryStore } from "~/store/category"
import { closeModal } from "~/plugins/modal"

import { modalTransactionTarget, formTransactionId } from "~/consts/transaction"

import type { FormValues } from "~/types/transactions"

const accountStore = useAccountStore()
const categoryStore = useCategoryStore()
const transactionStore = useTransactionStore()
const transactionTypeStore = useTransactionTypeStore()

const { setCategory } = categoryStore
const { setTransaction, createTransfer, createTransaction, deleteTransaction } = transactionStore
const { getTransactionType } = transactionTypeStore
const { fetchAccounts } = accountStore

const { accounts } = storeToRefs(accountStore)
const { categories, categorySelected } = storeToRefs(categoryStore)
const { transactionSelected, transactionTypeOptionSelected, transactionFilters, formActionType } = storeToRefs(transactionStore)

const formValues = ref<FormValues>({})

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-show-modal', async () => {
    const { id, value, date, accountId, description, note, categoryId, subCategoryId, transfer } = transactionSelected.value ?? {}

    formValues.value = {
      id,
      value,
      accountId,
      description,
      note,
      categoryId,
      subCategoryId,
      transfer,
      accountFromId: transfer?.accountFromId,
      accountToId: transfer?.accountToId,
      date: date
        ? date.split('T').slice(0, 1)
        : new Date(
          transactionFilters.value.year,
          transactionFilters.value.month,
          new Date().getDate()
        ).toISOString().split('T')[0]
    }
  })

  window.addEventListener('on-close-modal', () => {
    setCategory(null)
    setTransaction(Object.assign({}, null))
    formValues.value = Object.assign({}, null)

    if (formActionType.value !== 'delete') {
      reset(formTransactionId)
    }
  })
})

const modalData = computed(() => {
  const action = {
    'create': 'Nova',
    'update': 'Editar',
    'delete': 'Remover'
  }

  const options = {
    'earnings': 'receita',
    'expenses': 'despesa',
    'transfer': 'transferência'
  }

  const color = {
    'earnings': 'lime-500',
    'expenses': 'red-500',
    'transfer': 'blue-500'
  }

  return {
    title: [action[formActionType.value], options[transactionTypeOptionSelected.value]].join(' '),
    color: color[transactionTypeOptionSelected.value]
  }
})

const subCategoriesOptions = computed(() => {
  if (!categorySelected.value) {
    return []
  }

  return categorySelected.value.subCategory.map(subCategory => ({
    value: subCategory.id,
    label: subCategory.name
  }))
})

const handleSelectCategory = async (event: Event) => {
  const select = event.target as HTMLSelectElement
  const category = categories.value.find(category => category.id === select.value)

  setCategory(category)
}

const handleDeleteAccount = async (): Promise<void> => {
  await deleteTransaction(formValues.value, transactionFilters.value)
  closeModal(modalTransactionTarget)
}

const handleSubmit = async (payload): Promise<void> => {
  try {
    const transactionData = payload

    if (transactionTypeOptionSelected.value === 'transfer') {
      await createTransfer(transactionData, transactionFilters.value)

      return void 0
    }

    const transactionType = getTransactionType(transactionTypeOptionSelected.value)

    transactionData.typeId = transactionType?.id

    await createTransaction(transactionData, transactionFilters.value)
  } catch (error) {
    console.error(error)
  } finally {
    closeModal(modalTransactionTarget)
    reset(formTransactionId)
  }
}
</script>

<template>
  <client-only>
    <base-modal
      :target="modalTransactionTarget"
      :title="modalData.title"
      :header-title-color="`text-${modalData.color}`"
      size="3xl"
    >
      <template #body>
        <section v-if="formActionType !== 'delete'">
          <form-kit
            type="form"
            :id="formTransactionId"
            :actions="false"
            :incomplete-message="false"
            v-model="formValues"
            @submit="handleSubmit"
          >
            <div class="p-6">
              <div class="flex gap-4">
                <div :class="transactionTypeOptionSelected !== 'transfer' ? 'basis-2/4' : 'basis-full'">
                  <div class="flex gap-4">
                    <div class="flex-1">
                      <form-input
                        name="value"
                        label="Valor"
                        validation="required:trim"
                      />
                    </div>

                    <div class="flex-1">
                      <form-input
                        type="date"
                        name="date"
                        label="Data"
                        validation="required:trim"
                      />
                    </div>
                  </div>
                </div>
                <div class="basis-2/4" v-if="transactionTypeOptionSelected !== 'transfer'">
                  <form-select
                    name="accountId"
                    label="Conta"
                    :options="[
                        { label: 'Selecione uma conta', value: '' },
                        ...accounts.map(account => ({ value: account.id, label: account.name }))
                      ]"
                    validation="required:trim"
                  />
                </div>
              </div>

              <div class="flex mt-6">
                <form-input
                  name="description"
                  label="Descrição"
                  validation="required:trim"
                />
              </div>

              <div class="flex mt-6">
                <form-input
                  type="textarea"
                  name="note"
                  label="Observação"
                  rows="4"
                  validation="length:0,600"
                />
              </div>

              <div class="flex gap-4 mt-6" v-if="transactionTypeOptionSelected !== 'transfer'">
                <form-select
                  name="categoryId"
                  label="Categoria"
                  :options="[
                      { label: 'Selecione uma categoria', value: '' },
                      ...categories.map(category => ({ value: category.id, label: category.name }))
                    ]"
                  validation="required:trim"
                  @change="handleSelectCategory"
                />

                <form-select
                  name="subCategoryId"
                  label="Sub Categoria"
                  :options="[
                      { label: 'Selecione uma Sub Categoria', value: '' },
                      ...subCategoriesOptions
                    ]"
                  validation="required:trim"
                />
              </div>

              <div class="flex gap-4 mt-6" v-if="transactionTypeOptionSelected === 'transfer'">
                <form-select
                  name="accountFromId"
                  label="Conta de origem"
                  :options="[
                      { label: 'Selecione a conta de origem', value: '' },
                      ...accounts.map(account => ({ value: account.id, label: account.name }))
                    ]"
                  validation="required:trim"
                />

                <form-select
                  name="accountToId"
                  label="Conta de destino"
                  :options="[
                      { label: 'Selecione a conta de destino', value: '' },
                      ...accounts.map(account => ({ value: account.id, label: account.name }))
                    ]"
                  validation="required:trim"
                />
              </div>
            </div>

            <section class="p-6 rounded-b border-t border-black[0.9] text-right">
              <form-kit
                type="submit"
                input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
                label="Confirmar"
              />
            </section>
          </form-kit>
        </section>

        <section class="p-6 text-center" v-if="formActionType === 'delete'">
          <confirm-delete
            :name="formValues?.description ?? ''"
            :form-values="formValues"
            @handle-click="action => action === 'confirm' ? handleDeleteAccount() : closeModal(modalTransactionTarget)"
          />
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
