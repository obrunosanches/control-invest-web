<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category as ICategory, CategoryType as ICategoryType, } from "@prisma/client";

import Button from '~/components/TheButton.vue';
import BaseTable from '~/components/Table/BaseTable.vue';
import BaseTableHead from '~/components/Table/BaseTable.Head.vue';
import BaseTableHeadCell from '~/components/Table/BaseTable.HeadCell.vue';
import BaseTableBody from '~/components/Table/BaseTable.Body.vue';
import BaseTableRow from '~/components/Table/BaseTable.BodyRow.vue';
import BaseTableCell from '~/components/Table/BaseTable.BodyCell.vue';
import AddRegisttryIcon from '~~/components/Icons/AddRegisttryIcon.vue';
import EditRegisttryIcon from '~~/components/Icons/EditRegisttryIcon.vue';
import RemoveRegisttryIcon from '~~/components/Icons/RemoveRegisttryIcon.vue';

interface ICategoryWithType extends ICategory {
  type: ICategoryType;
}

const categories = ref<ICategoryWithType[]>([])

onMounted(async () => {
  const { data } = await useFetch<ICategoryWithType[]>('/api/category')
  categories.value = data.value ?? []
})
</script>

<template>
  <h2 class="text-2xl">Categorias</h2>

  <div class="flex justify-end">
    <NuxtLink to="categories/new">
      <Button type="button" color="default">
        Adicionar
      </Button>
    </NuxtLink>
  </div>

  <BaseTable v-if="categories.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <BaseTableHead class="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Name</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">actions</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow v-for="item in categories" :key="item.name">
        <BaseTableCell>
          {{ item.name }}
        </BaseTableCell>
        <BaseTableCell class="flex justify-end items-center gap-2">
          <router-link :to="`categories/${item.id}`">
            <AddRegisttryIcon class="text-green-600" />
          </router-link>
          <router-link :to="`categories/${item.id}`">
            <EditRegisttryIcon class="text-blue-600" />
          </router-link>
          <router-link :to="`categories/${item.id}`">
            <RemoveRegisttryIcon class="text-red-500" />
          </router-link>
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
</template>