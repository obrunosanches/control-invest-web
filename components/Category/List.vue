<script setup lang="ts">
import type { Category, SubCategory } from "@prisma/client"
import type { ItemActionType } from "~/types"
import type { CategoryWithIncludes } from "~/store/category"

const props = defineProps<{
  categories: CategoryWithIncludes[]}
>()

const emit = defineEmits<{
  (e: 'handleClickCategory', category: Category, action: ItemActionType): void
  (e: 'handleClickSubCategory', category: Category, subCategory: SubCategory, action: ItemActionType): void
}>()
</script>

<template>
  <div class="bg-gray-700 rounded-3xl mt-8">
    <div v-if="!categories.length" class="px-6 py-8 text-gray-400 font-medium">
      Nenhum registro encontrado
    </div>
    <base-table v-else>
      <template #head>
        <tr>
          <td class="px-6 py-6">Nome</td>
          <td class="w-36 px-6 py-6">Ações</td>
        </tr>
      </template>

      <template #body>
        <base-table-body-row v-for="category in props.categories">
          <td colspan="2">
            <base-table>
              <template #body>
                <tr>
                  <td class="px-6 py-6">
                    {{ category.name }}
                  </td>
                  <td class="w-36 px-6 py-6">
                    <div class="flex gap-2">
                      <form-kit
                        type="button"
                        @click="emit('handleClickSubCategory', category, null, 'create')"
                      >
                        <icons-add />
                      </form-kit>
                      <form-kit
                        type="button"
                        @click="emit('handleClickCategory', category, 'update')"
                      >
                        <icons-edit />
                      </form-kit>
                      <form-kit
                        type="button"
                        @click="emit('handleClickCategory', category, 'delete')"
                      >
                        <icons-delete />
                      </form-kit>
                    </div>
                  </td>
                </tr>

                <tr v-if="category.subCategory.length">
                  <td colspan="2" class="px-10 pb-6">
                    <sub-category-list
                      :category="category"
                      @handle-click="(subCategory, action) => emit('handleClickSubCategory', category, subCategory, action)"
                    />
                  </td>
                </tr>
              </template>
            </base-table>
          </td>
        </base-table-body-row>
      </template>

      <template #foot>
        <tr>
          <td class="px-6 py-4 last:text-right" colspan="2">
            <span>&nbsp;</span>
          </td>
        </tr>
      </template>
    </base-table>
  </div>
</template>
