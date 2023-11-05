<script setup lang="ts">
import type { CategoryWithType } from "~/store/category"
import type { Category } from "@prisma/client"

const props = defineProps<{
  categories: CategoryWithType[]}
>()

const emit = defineEmits<{
  (e: 'add', categoryId: string)
  (e: 'update', category: Category)
  (e: 'delete', categoryId: string)
}>()
</script>

<template>
  <div class="bg-gray-700 rounded-3xl">
    <base-table>
      <template #head>
        <tr>
          <base-table-head-cell>Nome</base-table-head-cell>
          <base-table-head-cell>Ações</base-table-head-cell>
        </tr>
      </template>
      <template #body>
        <tr
          class="bg-gray-800"
          v-for="category in props.categories"
        >
          <base-table-body-cell>
            {{ category.name }}
          </base-table-body-cell>
          <base-table-body-cell class="w-1/12">
            <div class="flex gap-2">
              <form-kit
                type="button"
                @click="emit('update', category.id)"
              >
                <icons-add />
              </form-kit>
              <form-kit
                type="button"
                @click="emit('update', category)"
              >
                <icons-edit />
              </form-kit>
              <form-kit
                type="button"
                @click="emit('delete', category.id)"
              >
                <icons-delete />
              </form-kit>
            </div>
          </base-table-body-cell>
        </tr>
      </template>
      <template #foot>
        <tr>
          <base-table-foot-cell colspan="2">
            <span>&nbsp;</span>
          </base-table-foot-cell>
        </tr>
      </template>
    </base-table>
  </div>
</template>
