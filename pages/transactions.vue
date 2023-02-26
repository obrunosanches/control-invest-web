<script setup lang="ts">
import {storeToRefs} from "pinia";
import type {Account, CategoryType, SubCategory} from "@prisma/client";

import {hide} from '~/plugins/modal';
import {useTransactionStore} from "~/store/transaction";
import {useCategoryStore} from "~/store/category";
import {useCategoryTypeStore} from "~/store/categoryType";
import {DateSelected} from "~/types/transactions";

import Button from '~/components/TheButton.vue';
import Modal from '~/components/base/Modal.vue';
import ModalHeader from '~/components/base/modal/Header.vue';
import ModalBody from '~/components/base/modal/Body.vue';
import ModalFooter from '~/components/base/modal/Footer.vue';

const transactionModalTarget: string = "accountModal"
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const categoryTypeStore = useCategoryTypeStore()

const {fetch: fetchTransaction, create: createTransaction} = transactionStore
const {fetchByType: fetchCategoryByType} = categoryStore
const {fetch: fetchCategoryTypes} = categoryTypeStore

const {transactions} = storeToRefs(transactionStore)
const {categories} = storeToRefs(categoryStore)
const {categoryTypes} = storeToRefs(categoryTypeStore)

const {data: accounts} = await useAsyncData<Account[]>('account', () => $fetch('/api/account'))

const categoryType = ref<CategoryType | null>(null)
const subCategories = ref<SubCategory[]>([])
const dateSelected = reactive<DateSelected>({
  month: String(new Date().getMonth() + 1),
  year: new Date().getFullYear().toString()
})

onBeforeMount(async () => {
  await fetchCategoryTypes()
  await handleFetchTransaction(null)

  window.addEventListener('on-show-modal', async () => {
    const typeId = categoryType.value?.id ?? ''
    await fetchCategoryByType(typeId)
  })
})

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  formData.append('categoryTypeId', categoryType.value?.id ?? '')

  await createTransaction(formData)

  form.reset()
  hide(transactionModalTarget)
}

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
    optionSelected = categoryTypes.value?.find(item => item.id === value)
  }

  categoryType.value = optionSelected as CategoryType
}

const fetchSubCategory = async (event: Event) => {
  const category = event.target as HTMLSelectElement
  const categoryId = category.value

  const {data} = await useFetch<SubCategory[]>(`/api/category/sub-category/${categoryId}`)

  subCategories.value = data.value as SubCategory[]
}

watch(categoryType, async (itemSelected) => handleFetchTransaction(itemSelected))
</script>

<template>
  <div class="flex justify-between items-center">
    <form-select name="typeId" @change="selectCategoryType" class="w-1/2">
      <option :value="''">Transações</option>
      <option v-for="{ id, description } in categoryTypes" :key="id" :value="id">
        {{ description }}
      </option>
    </form-select>

    <Button v-if="categoryType?.id" type="button" color="default" v-show-modal="transactionModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="transactionModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="transactionModalTarget" :title="`Cadastrar transação - ${categoryType?.description}`"/>
    <form id="account" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <div class="flex gap-4 items-end">
          <fieldset class="flex-1">
            <form-input name="value" label="Valor"/>
          </fieldset>

          <fieldset class="flex-1">
            <form-input name="date" type="date" label="Data"/>
          </fieldset>

          <fieldset class="basis-2/4">
            <form-select name="accountId" label="Conta">
              <option v-for="{ id, name } in accounts" :key="id" :value="id">
                {{ name }}
              </option>
            </form-select>
          </fieldset>
        </div>

        <fieldset class="flex-auto mt-6">
          <form-input name="description" label="Descrição"/>
        </fieldset>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-1">
            <form-select name="categoryId" label="Categoria" @change="fetchSubCategory">
              <option selected>Selecione a categoria</option>
              <option v-for="{ id, name } in categories" :key="id" :value="id">
                {{ name }}
              </option>
            </form-select>
          </fieldset>

          <fieldset class="flex-1">
            <form-select name="subCategoryId" label="Sub Categoria">
              <option selected>Selecione a sub categoria</option>
              <option v-for="{ id, name } in subCategories" :key="id" :value="id">
                {{ name }}
              </option>
            </form-select>
          </fieldset>
        </div>
      </ModalBody>
      <ModalFooter class="text-right">
        <Button type="submit" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>

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