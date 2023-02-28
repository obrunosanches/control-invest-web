<script setup lang="ts">
import BaseTable from "~/components/base/Table.vue";
import {useCategoryTypeStore} from "~/store/categoryType";
import {storeToRefs} from "pinia";

const categoryTypeStore = useCategoryTypeStore()
const { fetchCategoryTypes } = categoryTypeStore
const { categoryTypes } = storeToRefs(categoryTypeStore)

onBeforeMount(async () => await fetchCategoryTypes())
</script>

<template>
  <h2 class="text-2xl">Tipo de categoria</h2>

  <base-table v-if="categoryTypes.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Descrição</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in categoryTypes" :key="item.description">
        <base-table-body-cell>
          {{ item.description }}
        </base-table-body-cell>
        <base-table-body-cell>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          <span class="px-2 text-gray-300">|</span>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>