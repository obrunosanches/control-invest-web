<script setup lang="ts">
import { useCategoryTypeStore } from "~/store/categoryType"

import type { CategoryType } from "@prisma/client"

const categoryTypeStore = useCategoryTypeStore()

const { fetchCategoryTypes } = categoryTypeStore
const { categoryTypes } = storeToRefs(categoryTypeStore)

const categoryTypeSelected = ref<CategoryType>(null)

onBeforeMount(async () => {
  await fetchCategoryTypes()

  categoryTypeSelected.value = categoryTypes.value.find(() => true)
})

const categoryTypesOptions = computed(() => categoryTypes.value.map(item => ({
  value: item.id,
  label: item.description
})))

const categoryTypeColor = computed(() => categoryTypeSelected.value?.id === '653c32b20e8ce3e27fc746bf' ? 'green' : 'red')

const handleCategorySelected = (event: Event) => {
  const select = event.target as HTMLSelectElement

  categoryTypeSelected.value = categoryTypes.value.find(category => category.id === select.value)
}
</script>

<template>
  <client-only>
    <main class="p-5 w-full">
      <h1 class="text-gray-300 text-3xl font-bold">
        Categorias
      </h1>
    </main>

    <div class="flex justify-between gap-4">
      <div class="w-1/3">
        <form-select
          name="accountTypeId"
          :input-class="`w-full border rounded p-2.5 text-sm bg-${categoryTypeColor}-600 border-${categoryTypeColor}-500 placeholder-gray-400 text-white`"
          :options="categoryTypesOptions"
          @change="handleCategorySelected"
        />
      </div>

      <div class="w-full flex-auto items-end text-right">
        <form-kit
          type="button"
          label="Adicionar Categoria"
          :input-class="`bg-${categoryTypeColor}-700 hover:bg-${categoryTypeColor}-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm`"
        />
      </div>
    </div>
  </client-only>
</template>
