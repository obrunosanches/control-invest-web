<script setup lang="ts">
import { reset } from "@formkit/core"

import { useCategoryStore } from "~/store/category"
import { useTransactionTypeStore } from "~/store/transactionType"
import { useSubCategoryStore } from "~/store/subCategory"
import { closeModal, showModal } from "~/plugins/modal"

import type { Category, TransactionType, SubCategory } from "@prisma/client"
import type { ItemActionType } from "~/types"

import ConfirmDelete from "~/components/ConfirmDelete.vue"

const transactionTypeStore = useTransactionTypeStore()
const categoryStore = useCategoryStore()
const subCategoryStore = useSubCategoryStore()

const { fetchTransactionTypes, getDefaultTransactionTypes } = transactionTypeStore
const { fetchCategoriesByType, createOrUpdateCategory, deleteCategory } = categoryStore
const { createOrUpdateSubCategory, deleteSubCategory } = subCategoryStore
const { transactionTypes } = storeToRefs(transactionTypeStore)
const { categories } = storeToRefs(categoryStore)

const modalTarget = 'main-modal'
const categoryFormId = 'category-form'
const subCategoryFormId = 'sub-category-form'

const transactionTypeSelected = ref<TransactionType>(null)
const categorySelected = ref<Category>(null)
const subCategorySelected = ref<SubCategory>(null)
const formModelActionType = ref<ItemActionType>('create')
const formModel = ref<'category' | 'sub-category'>('category')

onBeforeMount(async () => {
  await fetchTransactionTypes()
  await fetchCategories()

  window.addEventListener('on-close-modal', () => {
    formModel.value = 'category'
    formModelActionType.value = 'create'
    categorySelected.value = Object.assign({}, null)
    subCategorySelected.value = Object.assign({}, null)
  })
})

const fetchCategories = async () => {
  if (!transactionTypeSelected.value) {
    transactionTypeSelected.value = transactionTypes.value.find(() => true)
  }

  await fetchCategoriesByType(transactionTypeSelected.value.id)
}

const handleSelectTransactionType = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  transactionTypeSelected.value = transactionTypes.value.find(category => category.id === select.value)

  await fetchCategories()
}

const handleSelectCategory = async (category: Category, action: ItemActionType) => {
  formModel.value = 'category'
  formModelActionType.value = action
  categorySelected.value = Object.assign({}, category)

  showModal(modalTarget)
}

const handleSelectSubCategory = (category: Category, subCategory: SubCategory, action: ItemActionType) => {
  formModel.value = 'sub-category'
  formModelActionType.value = action
  categorySelected.value = Object.assign({}, category)
  subCategorySelected.value = Object.assign({}, subCategory)

  showModal(modalTarget)
}

const handleDelete = async () => {
  if (formModel.value === 'category') {
    await deleteCategory(categorySelected.value)
  }

  if (formModel.value === 'sub-category') {
    await deleteSubCategory(subCategorySelected.value)
  }

  closeModal(modalTarget)
}

const handleFormCategorySubmit = async (payload): Promise<void> => {
  try {
    await createOrUpdateCategory({
      ...categorySelected,
      ...payload,
      typeId: transactionTypeSelected.value.id
    })
  } catch (error) {
    console.log(error)
  } finally {
    closeModal(modalTarget)
    reset(categoryFormId)
  }
}

const handleFormSubCategorySubmit = async (payload): Promise<void> => {
  try {
    await createOrUpdateSubCategory({
      ...payload,
      categoryId: categorySelected.value.id
    })
  } catch (error) {
    console.log(error)
  } finally {
    closeModal(modalTarget)
    reset(subCategoryFormId)
  }
}
</script>

<template>
  <client-only>
    <h1 class="text-3xl font-bold">
      Categorias
    </h1>

    <div class="flex justify-between gap-4 mt-6">
      <div class="w-1/3">
        <form-select
          input-class="w-full bg-gray-500 text-white py-3.5 px-5 font-medium rounded-full text-sm"
          :options="getDefaultTransactionTypes().map(type => ({ value: type.id, label: type.description }))"
          @change="handleSelectTransactionType"
        />
      </div>

      <div class="w-full flex-auto items-end text-right">
        <form-kit
          type="button"
          label="Adicionar Categoria"
          class="bg-purple-700 hover:bg-purple-600"
          input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-full text-sm"
          @click="handleSelectCategory(null, 'create')"
        />
      </div>
    </div>

    <category-list
      :categories="categories"
      @handle-click-category="(category, action) => handleSelectCategory(category, action)"
      @handle-click-sub-category="(category, subCategory, action) => handleSelectSubCategory(category, subCategory, action)"
    />

    <base-modal
      ref="modalElement"
      :target="modalTarget"
      :title="formModelActionType !== 'delete' ? formModel === 'category' ? 'Categoria' : 'Sub categoria' : null"
    >
      <template #body>
        <template v-if="formModel === 'category'">
          <section v-if="formModelActionType !== 'delete'">
            <form-kit
              :id="categoryFormId"
              :actions="false"
              :incomplete-message="false"
              type="form"
              @submit="handleFormCategorySubmit"
              v-model="categorySelected"
            >
              <div class="p-6">
                <div class="flex gap-4">
                  <form-input
                    name="name"
                    label="Nome"
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

          <section class="p-6 text-center" v-if="formModelActionType === 'delete'">
            <confirm-delete
              :name="categorySelected?.name"
              @handle-click="action => action === 'confirm' ? handleDelete() : closeModal(modalTarget)"
            />
          </section>
        </template>

        <template v-if="formModel === 'sub-category'">
          <section v-if="formModelActionType !== 'delete'">
            <form-kit
              :id="subCategoryFormId"
              :actions="false"
              :incomplete-message="false"
              type="form"
              @submit="handleFormSubCategorySubmit"
              v-model="subCategorySelected"
            >
              <div class="p-6">
                <div class="flex gap-4">
                  <form-input
                    name="name"
                    label="Nome"
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

          <section class="p-6 text-center" v-if="formModelActionType === 'delete'">
            <confirm-delete
              :name="subCategorySelected?.name"
              @handle-click="action => action === 'confirm' ? handleDelete() : closeModal(modalTarget)"
            />
          </section>
        </template>
      </template>
    </base-modal>
  </client-only>
</template>
