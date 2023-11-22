<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { useAccountStore } from "~/store/account"
import { useTransactionStore } from "~/store/transaction"
import { useTransactionTypeStore } from "~/store/transactionType"
import { useCategoryStore } from "~/store/category"
import { closeModal } from "~/plugins/modal"

import type { TransactionTypesOptions } from "~/types"
import type { TransactionWithIncludes } from "~/store/transaction"

import { modalTransactionTarget, formTransactionId } from "~/consts/transaction"

const accountStore = useAccountStore()
const categoryStore = useCategoryStore()
const transactionStore = useTransactionStore()
const transactionTypeStore = useTransactionTypeStore()

const { fetchCategoriesByOption, fetchCategoriesByType, getCategory, setCategory } = categoryStore
const { setFormActionType, setTransaction, createTransfer, createTransaction, deleteTransaction } = transactionStore
const { getTransactionType } = transactionTypeStore
const { fetchAccounts } = accountStore

const { accounts } = storeToRefs(accountStore)
const { categories, categorySelected } = storeToRefs(categoryStore)
const { transactionSelected, transactionTypeOptionSelected, transactionFilters, formActionType } = storeToRefs(transactionStore)

onBeforeMount(async () => {
  await fetchAccounts()

  window.addEventListener('on-close-modal', () => {
    setFormActionType('create')
    setCategory(null)
    setTransaction(Object.assign({}, null))
  })
})

const modalTitle = computed(() => {
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

  return [action[formActionType.value], options[transactionTypeOptionSelected.value]].join(' ')
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
  await deleteTransaction(transactionSelected.value, transactionFilters.value)
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

watch(transactionTypeOptionSelected, async (option: TransactionTypesOptions) => {
  await fetchCategoriesByOption(option)
})

watch(transactionSelected, async (transaction: TransactionWithIncludes) => {
  if (transaction.id) {
    await fetchCategoriesByType(transaction.type.id)
    const category = getCategory(transaction.category.id)

    setCategory(category)
  }
})
</script>

<template>
  <client-only>
    <base-modal
      :target="modalTransactionTarget"
      :title="modalTitle"
      size="3xl"
    >
      <template #body>
        <section v-if="formActionType !== 'delete'">
          <form-kit
            type="form"
            :id="formTransactionId"
            :actions="false"
            :incomplete-message="false"
            v-model="transactionSelected"
            @submit="handleSubmit"
          >
            <section v-if="transactionTypeOptionSelected !== 'transfer'">
              <div class="p-6">
                <div class="flex gap-4">
                  <div class="basis-2/4">
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
                  <div class="basis-2/4">
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

                <div class="flex gap-4 mt-6">
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
              </div>
            </section>

            <section v-if="transactionTypeOptionSelected === 'transfer'">
              <div class="p-6">
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

                <div class="flex mt-6">
                  <form-input
                    name="description"
                    label="Descrição"
                    validation="required:trim"
                  />
                </div>

                <div class="flex gap-4 mt-6">
                  <form-select
                    name="accountFrom"
                    label="Conta de origem"
                    :options="[
                        { label: 'Selecione a conta de origem', value: '' },
                        ...accounts.map(account => ({ value: account.id, label: account.name }))
                      ]"
                    validation="required:trim"
                  />

                  <form-select
                    name="accountTo"
                    label="Conta de destino"
                    :options="[
                        { label: 'Selecione a conta de destino', value: '' },
                        ...accounts.map(account => ({ value: account.id, label: account.name }))
                      ]"
                    validation="required:trim"
                  />
                </div>
              </div>
            </section>

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
            :name="transactionSelected?.description"
            @handle-click="action => action === 'confirm' ? handleDeleteAccount() : closeModal(modalTransactionTarget)"
          />
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
