<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CategoryType as ICategoryType } from "@prisma/client";

import Button from '~/components/TheButton.vue';
import BaseTable from '~/components/Table/BaseTable.vue';
import BaseTableHead from '~/components/Table/BaseTable.Head.vue';
import BaseTableHeadCell from '~/components/Table/BaseTable.HeadCell.vue';
import BaseTableBody from '~/components/Table/BaseTable.Body.vue';
import BaseTableRow from '~/components/Table/BaseTable.BodyRow.vue';
import BaseTableCell from '~~/components/Table/BaseTable.BodyCell.vue';

const categoryTypes = ref<ICategoryType[]>([])

onMounted(async () => {
  const { data } = await useFetch<ICategoryType[]>('/api/category/type')
  categoryTypes.value = data.value ?? []
})
</script>

<template>
  <h2 class="text-2xl">Tipo de categoria</h2>

  <BaseTable v-if="categoryTypes.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <BaseTableHead class="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Descrição</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">actions</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow v-for="item in categoryTypes" :key="item.description">
        <BaseTableCell>
          {{ item.description }}
        </BaseTableCell>
        <BaseTableCell>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          <span class="px-2 text-gray-300">|</span>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
  
</template>