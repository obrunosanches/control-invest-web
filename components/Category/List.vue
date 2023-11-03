<script setup lang="ts">
import type { CategoryWithType } from "~/store/category"

const props = defineProps<{
  categories: CategoryWithType[]}
>()
</script>

<template>
  <div class="mt-6 text-white">
    <h1>Listagem de Categoria</h1>

    <div v-for="category in props.categories">
      {{ category.name }}
    </div>
  </div>
</template>
