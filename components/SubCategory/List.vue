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
      <tr>
        <td colspan="2" class="py-6">
          <span>Sub Categorias</span>
        </td>
      </tr>
    </template>

    <template #body>
      <base-table-body-row v-for="subCategory in props.category.subCategory">
        <td class="py-2">
          {{ subCategory.name }}
        </td>
        <td class="py-2 w-1/12">
          <div class="flex gap-2">
            <form-kit
              type="button"
              @click="emit('handleClick', subCategory, 'update')"
            >
              <icons-edit />
            </form-kit>
            <form-kit
              type="button"
              @click="emit('handleClick', subCategory, 'delete')"
            >
              <icons-delete />
            </form-kit>
          </div>
        </td>
      </base-table-body-row>
    </template>
  </base-table>
</template>
