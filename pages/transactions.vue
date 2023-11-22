<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { useTransactionStore } from "~/store/transaction"
import { useTransactionTypeStore } from "~/store/transactionType"
import { useCategoryStore } from "~/store/category"
import { useAccountStore } from "~/store/account"
import { closeModal, showModal } from "~/plugins/modal"

import type { TransactionType } from "@prisma/client"
import type { DateSelected, ItemActionType, TransactionTypesOptions } from "~/types"
import type { CategoryWithIncludes } from "~/store/category"
import type { FetchTransactionFilter, TransactionWithIncludes } from "~/store/transaction"

const transactionStore = useTransactionStore()
const transactionTypeStore = useTransactionTypeStore()
const categoryStore = useCategoryStore()
const accountStore = useAccountStore()

const { fetchTransactionTypes, getDefaultTransactionTypes } = transactionTypeStore
const {
  fetchTransaction,
  getTransactionsByTransactionType,
  setTransactionTypeOption,
  createTransaction,
  createTransfer,
  deleteTransaction
} = transactionStore
const { fetchAccounts } = accountStore
const { fetchCategoriesByType } = categoryStore

const { transactionTypes } = storeToRefs(transactionTypeStore)
const { accounts } = storeToRefs(accountStore)
const { categories } = storeToRefs(categoryStore)
const { transactions, transactionTypeOptionSelected } = storeToRefs(transactionStore)

const modalTarget = 'main-modal'
const transactionFormId = 'transaction-form'
const formModelActionType = ref<ItemActionType>('create')
const transactionsByTransactionType = ref<TransactionWithIncludes>(transactions.value)
const transactionFilters = ref<FetchTransactionFilter>(null)
const transactionSelected = ref<TransactionWithIncludes>({})
const transactionTypeSelected = ref<TransactionType>(null)
const categorySelected = ref<CategoryWithIncludes>(null)

onBeforeMount(async () => {
  await fetchTransactionTypes()
  await fetchAccounts()

  setTransactionTypeOption('transaction')

  window.addEventListener('on-close-modal', () => {
    formModelActionType.value = 'create'
    categorySelected.value = null
    transactionSelected.value = Object.assign({}, null)
  })
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

const handleDateSelected = async (event: DateSelected) => {
  transactionFilters.value = {
    month: event.month,
    year: event.year,
    typeId: transactionTypeSelected.value?.id
  }

  await fetchTransaction(transactionFilters.value)
  await fetchCategoriesByType(transactionTypeSelected.value?.id)
}

const handleSelectTransactionType = async (event: Event) => {
  const select = event.target as HTMLSelectElement
  const transactionType = transactionTypes.value.find(type => type.slug === select.value) as TransactionType

  setTransactionTypeOption(select.value)
  transactionTypeSelected.value = transactionType
}

const handleSelectTransaction = async (transaction: TransactionWithIncludes, action: ItemActionType) => {
  const newTransaction = Object.assign({}, transaction)

  if (newTransaction.id && action !== 'delete') {
    newTransaction.date = newTransaction.date.split('T').slice(0, 1)

    transactionTypeSelected.value = newTransaction.type
    categorySelected.value = categories.value.find(category => category.id === newTransaction.category.id)
  }

  formModelActionType.value = action
  transactionSelected.value = newTransaction

  showModal(modalTarget)
}

const handleSelectCategory = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  categorySelected.value = categories.value.find(category => category.id === select.value)
}

const handleDeleteAccount = async (): Promise<void> => {
  await deleteTransaction(transactionSelected.value, transactionFilters.value)
  closeModal(modalTarget)
}

const handleSubmit = async (payload) => {
  try {
    const transactionData = payload

    if (transactionTypeOptionSelected.value !== 'transfer') {
      transactionData.typeId = transactionTypeSelected.value.id

      return await createTransaction(transactionData, transactionFilters.value)
    }

    await createTransfer(transactionData, transactionFilters.value)
  } catch (error) {
    console.error(error)
  } finally {
    closeModal(modalTarget)
    reset(transactionFormId)
  }
}

watch(transactions, () => (transactionsByTransactionType.value = getTransactionsByTransactionType(transactionTypeSelected.value?.id)))
// watch(transactionTypeSelected, () => transactionsByTransactionType.value = getTransactionsByTransactionType(transactionTypeSelected.value?.id))
</script>

<template>
  <client-only>
    <div class="flex justify-between gap-4 mt-6">
      <div class="w-1/3">
        <form-select
          input-class="w-full bg-purple-700 hover:bg-purple-600 text-white py-3.5 px-5 font-medium rounded-full text-sm"
          :options="[
            { value: 'transaction', label: 'Transações' },
            ...getDefaultTransactionTypes().map(type => ({ value: type.slug, label: type.description })),
            { value: 'transfer', label: 'Transferência' },
          ]"
          @change="handleSelectTransactionType"
        />
      </div>

      <div class="items-end">
        <form-kit
          v-if="transactionTypeOptionSelected !== 'transaction'"
          type="button"
          label="Nova Receita"
          class="w-fit"
          input-class="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-3 px-5 font-medium rounded-full text-sm"
          :ignore="false"
          @click="handleSelectTransaction({}, 'create')"
        >
          <icons-plus class="w-[14px] h-[14px]" stroke-width="2.5" />
          <span>Nova</span>
        </form-kit>
      </div>
    </div>

    <div class="flex gap-4 mt-8">
      <transaction-result-by-month />
    </div>

    <div class="bg-slate-50 border border-black[0.07] rounded-2xl mt-4">
      <div class="px-6 py-6">
        <month-year-selected @handle-click-date-select="handleDateSelected" />
      </div>

      <transaction-list
        :transactions="transactionsByTransactionType"
        @handle-click="(transaction, action) => handleSelectTransaction(transaction, action)"
      />
    </div>

    <base-modal
      :target="modalTarget"
      :title="'Transação'"
      size="3xl"
    >
      <template #body>
        <section v-if="formModelActionType !== 'delete'">
          <form-kit
            type="form"
            :id="transactionFormId"
            :actions="false"
            :incomplete-message="false"
            @submit="handleSubmit"
            v-model="transactionSelected"
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
                    @change="handleSelectCategory"
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

        <section class="p-6 text-center" v-if="formModelActionType === 'delete'">
          <confirm-delete
            :name="transactionSelected?.description"
            @handle-click="action => action === 'confirm' ? handleDeleteAccount() : closeModal(modalTarget)"
          />
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
