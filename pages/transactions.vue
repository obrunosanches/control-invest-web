<script setup lang="ts">
import { storeToRefs } from "pinia"
import { reset } from "@formkit/core"

import { useTransactionStore } from "~/store/transaction"
import { useCategoryTypeStore } from "~/store/categoryType"
import { useCategoryStore } from "~/store/category"
import { useAccountStore } from "~/store/account"
import { closeModal } from "~/plugins/modal"

import type { CategoryType } from "@prisma/client"
import type { DateSelected } from "~/types"
import type { CategoryWithIncludes } from "~/store/category"
import type { FetchTransactionFilter } from "~/store/transaction"

const transactionStore = useTransactionStore()
const categoryTypeStore = useCategoryTypeStore()
const categoryStore = useCategoryStore()
const accountStore = useAccountStore()

const { fetchCategoryTypes } = categoryTypeStore
const { fetchTransaction, createTransaction } = transactionStore
const { fetchAccounts } = accountStore
const { fetchCategoriesByType } = categoryStore

const { categoryTypes } = storeToRefs(categoryTypeStore)
const { accounts } = storeToRefs(accountStore)
const { categories } = storeToRefs(categoryStore)
const { transactions } = storeToRefs(transactionStore)

const modalTarget = 'main-modal'
const transactionFormId = 'transaction-form'
const transactionFilters = ref<FetchTransactionFilter>(null)
const categoryTypeSelected = ref<CategoryType>(null)
const categorySelected = ref<CategoryWithIncludes>(null)

onBeforeMount(async () => {
  await fetchCategoryTypes()
  await fetchAccounts()
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
    typeId: categoryTypeSelected.value?.id
  }

  await fetchTransaction(transactionFilters.value)
  await fetchCategoriesByType(categoryTypeSelected.value?.id)
}

const handleSelectCategoryType = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  categoryTypeSelected.value = categoryTypes.value.find(type => type.id === select.value)
}

const handleSelectCategory = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  categorySelected.value = categories.value.find(category => category.id === select.value)
}

const handleSubmit = async (payload) => {
  try {
    await createTransaction({
      ...payload,
      categoryTypeId: categoryTypeSelected.value.id
    }, transactionFilters.value)
  } catch (error) {
    console.error(error)
  } finally {
    closeModal(modalTarget)
    reset(transactionFormId)
  }
}
</script>

<template>
  <client-only>
    <div class="flex justify-between gap-4 mt-6">
      <div class="w-1/3">
        <form-select
          input-class="w-full bg-purple-700 hover:bg-purple-600 text-white py-3.5 px-5 font-medium rounded-full text-sm"
          :options="[
            { label: 'Transações', value: 'transacoes' },
            ...categoryTypes.map(type => ({ value: type.id, label: type.description }))
          ]"
          @change="handleSelectCategoryType"
        />
      </div>

      <div class="items-end">
        <form-kit
          v-if="categoryTypeSelected"
          type="button"
          label="Nova Receita"
          class="w-fit"
          input-class="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-3 px-5 font-medium rounded-full text-sm"
          v-show-modal="modalTarget"
          :ignore="false"
        >
          <icons-plus class="w-[14px] h-[14px]" stroke-width="2.5" />
          <span>Nova</span>
        </form-kit>
      </div>
    </div>

    <div class="bg-slate-50 border border-black[0.07] rounded-3xl mt-8">
      <div class="px-6 py-6">
        <month-year-selected @handle-click-date-select="handleDateSelected" />
      </div>

      <transaction-list :transactions="transactions" />
    </div>

    <base-modal
      :target="modalTarget"
      :title="'Transação'"
      size="3xl"
    >
      <template #body>
        <form-kit
          :id="transactionFormId"
          :actions="false"
          :incomplete-message="false"
          type="form"
          @submit="handleSubmit"
        >
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

          <section class="p-6 rounded-b border-t border-black[0.9] text-right">
            <form-kit
              type="submit"
              input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
              label="Confirmar"
            />
          </section>
        </form-kit>
      </template>
    </base-modal>
  </client-only>
</template>
