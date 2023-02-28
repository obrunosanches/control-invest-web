<template>
  <base-modal ref="modalElement" :target="transactionModalTarget" position="top-center" class="mt-16">
    <base-modal-header
      :target="transactionModalTarget"
      :title="`Nova transação - ${categoryTypeSelected?.description}`"
    />
    <form novalidate @submit.prevent="handleSubmit">
      <base-modal-body :hasTitle="true">
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
      </base-modal-body>

      <base-modal-footer class="text-right">
        <base-button type="submit">
          Confirmar
        </base-button>
      </base-modal-footer>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {SubCategory} from "@prisma/client";

import {useTransactionStore} from "~/store/transaction";
import {useCategoryStore} from "~/store/category";
import {useCategoryTypeStore} from "~/store/categoryType";
import {useAccountsStore} from "~/store/account";
import {hide} from "~/plugins/modal";

const transactionModalTarget: string = "transactionModal"
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const categoryTypeStore = useCategoryTypeStore()
const accountsStore = useAccountsStore()

const {accounts} = storeToRefs(accountsStore)
const {categories} = storeToRefs(categoryStore)
const {categoryTypeSelected} = storeToRefs(categoryTypeStore)

const {fetchAccounts} = accountsStore
const {createTransaction} = transactionStore
const {fetchCategoryByType} = categoryStore
const {fetchCategoryTypes} = categoryTypeStore

onBeforeMount(async () => {
  await fetchAccounts()
  await fetchCategoryTypes()

  window.addEventListener('on-show-modal', async () => {
    const typeId = categoryTypeSelected.value?.id ?? ''
    await fetchCategoryByType(typeId)
  })
})

const subCategories = ref<SubCategory[]>([])

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  formData.append('categoryTypeId', categoryTypeSelected.value?.id ?? '')

  await createTransaction(formData)

  form.reset()
  hide(transactionModalTarget)
}

const fetchSubCategory = async (event: Event) => {
  const category = event.target as HTMLSelectElement
  const categoryId = category.value

  const {data} = await useFetch<SubCategory[]>(`/api/category/sub-category/${categoryId}`)

  subCategories.value = data.value as SubCategory[]
}
</script>
