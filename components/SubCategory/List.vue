<script setup lang="ts">
import type { CategoryWithIncludes } from "~/store/category"
import type { ItemActionType } from "~/types"
import type { SubCategory } from "@prisma/client"

const props = defineProps<{
  category: CategoryWithIncludes
}>()

const emit = defineEmits<{
  (e: 'handleClick', subCategory: SubCategory, action: ItemActionType): void
}>()
</script>

<template>
  <base-table>
    <template #head>
      <th>
        <td colspan="2" class="py-4">
          <span>Sub Categorias</span>
        </td>
      </th>
    </template>

    <template #body>
      <base-table-body-row v-for="subCategory in props.category.subCategory">
        <td class="py-4">
          {{ subCategory.name }}
        </td>
        <td class="py-4 w-1/12">
          <div class="flex justify-center items-center gap-2">
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClick', subCategory, 'update')"
            >
              <icons-edit class="text-blue-500 hover:text-blue-400" />
            </form-kit>
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClick', subCategory, 'delete')"
            >
              <icons-delete class="text-rose-600 hover:text-rose-500" />
            </form-kit>
          </div>
        </td>
      </base-table-body-row>
    </template>
  </base-table>
</template>
