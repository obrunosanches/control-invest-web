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
  <div class="bg-slate-50 border border-black[0.07] rounded-3xl mt-8">
    <div v-if="!categories.length" class="px-6 py-8 font-medium">
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
                    <div class="flex justify-center items-center gap-2">
                      <form-kit
                        type="button"
                        wrapper-class="flex"
                        :ignore="false"
                        @click="emit('handleClickSubCategory', category, null, 'create')"
                      >
                        <icons-plus-circle class="text-lime-600 hover:text-lime-500" />
                      </form-kit>
                      <form-kit
                        type="button"
                        wrapper-class="flex"
                        :ignore="false"
                        @click="emit('handleClickCategory', category, 'update')"
                      >
                        <icons-edit class="text-blue-500 hover:text-blue-400" />
                      </form-kit>
                      <form-kit
                        type="button"
                        wrapper-class="flex"
                        :ignore="false"
                        @click="emit('handleClickCategory', category, 'delete')"
                      >
                        <icons-delete class="text-rose-600 hover:text-rose-500" />
                      </form-kit>
                    </div>
                  </td>
                </tr>

                <tr v-if="category.subCategory.length">
                  <td colspan="2" class="px-6">
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
