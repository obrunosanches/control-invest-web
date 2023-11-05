<script setup lang="ts">
import { useCategoryTypeStore } from "~/store/categoryType"

import type { Category, CategoryType } from "@prisma/client"
import type { ItemActionType } from "~/types"
import { closeModal, showModal } from "~/plugins/modal"
import { type CategoryWithType, useCategoryStore } from "~/store/category"

const categoryTypeStore = useCategoryTypeStore()
const categoryStore = useCategoryStore()

const { fetchCategoryTypes } = categoryTypeStore
const { fetchCategoriesByType, createOrUpdateCategory } = categoryStore
const { categoryTypes } = storeToRefs(categoryTypeStore)
const { categories } = storeToRefs(categoryStore)

const modalTarget = 'main-modal'
const categoryFormId = 'category-form'
const categoryTypeSelected = ref<CategoryType>(null)
const categorySelected = ref<Category>(null)
const categoryAction = ref<ItemActionType>('create')

onBeforeMount(async () => {
  await fetchCategoryTypes()

  categoryTypeSelected.value = categoryTypes.value.find(() => true)

  await fetchCategories()
})

const categoryTypesOptions = computed(() => categoryTypes.value.map(item => ({
  value: item.id,
  label: item.description
})))

const fetchCategories = async () => {
  if (categoryTypeSelected.value) {
    await fetchCategoriesByType(categoryTypeSelected.value.id)
  }
}

const handleSelectCategoryType = async (event: Event) => {
  const select = event.target as HTMLSelectElement

  categoryTypeSelected.value = categoryTypes.value.find(category => category.id === select.value)

  await fetchCategories()
}

const handleSelectCategory = (category: CategoryWithType, action: ItemActionType) => {
  categorySelected.value = Object.assign({}, category)
  categoryAction.value = action

  showModal(modalTarget)
}

const handleSubmit = async (payload): Promise<void> => {
  try {
    await createOrUpdateCategory({
      ...categorySelected,
      ...payload,
      typeId: categoryTypeSelected.value.id
    })
  } catch (error) {
    console.log(error)
  } finally {
    closeModal(modalTarget)
  }
}
</script>

<template>
  <client-only>
    <h1 class="text-gray-300 text-3xl font-bold">
      Categorias
    </h1>

    <div class="flex justify-between gap-4 mt-6">
      <div class="w-1/3">
        <form-select
          name="accountTypeId"
          input-class="w-full bg-gray-500 rounded-lg p-2.5 text-smborder-0 placeholder-gray-400 text-white"
          :options="categoryTypesOptions"
          @change="handleSelectCategoryType"
        />
      </div>

      <div class="w-full flex-auto items-end text-right">
        <form-kit
          type="button"
          label="Adicionar Categoria"
          class="bg-purple-700 hover:bg-purple-600"
          input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
          @click="handleSelectCategory(null, 'create')"
        />
      </div>
    </div>

    <category-list
      :categories="categories"
      @add="categoryId => console.log('action:add', categoryId)"
      @update="category => handleSelectCategory(category, 'update')"
      @delete="categoryId => console.log('action:delete', categoryId)"
    />

    <base-modal
      ref="modalElement"
      :target="modalTarget"
      :title="categoryAction !== 'delete' ? 'Nova categoria': null"
    >
      <template #body>
        <section v-if="categoryAction !== 'delete'">
          <form-kit
            :id="categoryFormId"
            type="form"
            :actions="false"
            :incomplete-message="false"
            @submit="handleSubmit"
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

            <section class="p-6 rounded-b border-t border-gray-600 text-right">
              <form-kit
                type="submit"
                input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
                label="Confirmar"
              />
            </section>
          </form-kit>
        </section>
      </template>
    </base-modal>
  </client-only>
</template>
