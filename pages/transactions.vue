<script setup lang="ts">
import { useCategoryStore } from "~/store/category"
import { useTransactionStore } from "~/store/transaction"
import { useTransactionTypeStore } from "~/store/transactionType"

import type { TransactionType } from "@prisma/client"
import type { DateSelected, ItemActionType, TransactionTypesOptions } from "~/types"
import type { TransactionWithIncludes } from "~/store/transaction"

import { modalTransactionTarget } from "~/consts/transaction"

import { showModal } from "~/plugins/modal"

const transactionStore = useTransactionStore()
const transactionTypeStore = useTransactionTypeStore()
const categoryStore = useCategoryStore()

const { getCategory, setCategory, fetchCategoriesByOption } = categoryStore
const { getDefaultTransactionTypes, getTransactionType } = transactionTypeStore
const {
  fetchTransaction,
  setTransactionTypeOption,
  setTransaction,
  setFormActionType,
  setTransactionFilter
} = transactionStore

const transactionTypeSelected = ref<TransactionType>(null)
const transactionTypeOptionSelected = ref<TransactionTypesOptions>('transaction')

onBeforeMount(async () => {
  setTransactionTypeOption('transaction')
})

const handleDateSelected = async (event: DateSelected) => {
  const transactionFilters = {
    month: event.month,
    year: event.year,
    typeId: transactionTypeSelected.value?.id
  }

  setTransactionFilter(transactionFilters)

  await fetchTransaction(transactionFilters)
}

const handleSelectTransactionType = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  await fetchCategoriesByOption(select.value)

  const transactionType = getTransactionType(select.value)

  setTransactionTypeOption(select.value)
  transactionTypeOptionSelected.value = select.value
  transactionTypeSelected.value = transactionType
}

const handleSelectTransaction = async (transaction: TransactionWithIncludes, action: ItemActionType) => {
  const newTransaction = Object.assign({}, transaction)
  const option = newTransaction.id ? newTransaction.type.slug : transactionTypeOptionSelected.value

  await fetchCategoriesByOption(option)
  setTransactionTypeOption(option)

  if (newTransaction.id) {
    const category = getCategory(newTransaction.category.id)

    setCategory(category)
    transactionTypeSelected.value = newTransaction.type
  }

  setFormActionType(action)
  setTransaction(newTransaction)

  showModal(modalTransactionTarget)
}
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

    <transaction-result-by-month class="w-full mt-8" />

    <div class="bg-slate-50 border border-black[0.07] rounded-2xl mt-4">
      <div class="px-6 py-6">
        <month-year-selected @handle-click-date-select="dateSelected => handleDateSelected(dateSelected)" />
      </div>

      <transaction-list @handle-click="(transaction, action) => handleSelectTransaction(transaction, action)" />
    </div>
  </client-only>
</template>
