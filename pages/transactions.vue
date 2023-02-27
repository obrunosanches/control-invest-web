<template>
  <div class="flex justify-between items-center">
    <form-select name="typeId" @change="selectCategoryType" class="w-1/2">
      <option :value="''">Transações</option>
      <option
        v-for="{ id, description } in categoryTypes"
        :key="id"
        :value="id"
        :selected="categoryType?.id === id"
      >
        {{ description }}
      </option>
    </form-select>

    <Button
      v-if="categoryType?.id"
      type="button"
      color="default"
      v-show-modal="transactionModalTarget"
    >
      Adicionar
    </Button>
  </div>

  <div class="mt-8">
    <month-year-selected @date-selected="handleDateSelected"/>
  </div>

  <base-table v-if="transactions?.length" class="w-full text-sm text-left text-gray-400 mt-4" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Name</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in transactions" :key="item.description">
        <base-table-body-cell>
          {{ item.description }}
        </base-table-body-cell>
        <base-table-body-cell class="flex justify-end items-center gap-2">
          <Button class="bg-transparent">
            <icons-edit-registtry-icon class="text-blue-600"/>
          </Button>
          <Button class="bg-transparent">
            <icons-remove-registtry-icon class="text-red-500"/>
          </Button>
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import type {CategoryType} from "@prisma/client";

import {useTransactionStore} from "~/store/transaction";
import {useCategoryTypeStore} from "~/store/categoryType";
import {DateSelected} from "~/types/transactions";

import Button from '~/components/TheButton.vue';

const transactionModalTarget: string = "transactionModal"
const transactionStore = useTransactionStore()
const categoryTypeStore = useCategoryTypeStore()

const {fetch: fetchTransaction} = transactionStore
const {selectedItem} = categoryTypeStore

const {transactions} = storeToRefs(transactionStore)
const {categoryTypes, itemSelected: categoryType} = storeToRefs(categoryTypeStore)

const dateSelected = reactive<DateSelected>({
  month: String(new Date().getMonth() + 1),
  year: new Date().getFullYear().toString()
})

onBeforeMount(async () => await handleFetchTransaction(null))

const handleFetchTransaction = async (itemSelected: CategoryType | null) => {
  const {month, year} = dateSelected
  const type = itemSelected?.id ?? ''

  await fetchTransaction({month, year, type})
}

const handleDateSelected = (event: DateSelected): void => {
  dateSelected.month = event.month
  dateSelected.year = event.year

  handleFetchTransaction(categoryType.value)
}

const selectCategoryType = async (event: Event) => {
  const {value} = event.target as HTMLSelectElement

  let optionSelected = null

  if (Boolean(value)) {
    optionSelected = categoryTypes.value?.find(item => item.id === value) as CategoryType
  }

  selectedItem(optionSelected ? optionSelected.id : null)
}

watch(categoryType, async (item) => handleFetchTransaction(item))
</script>