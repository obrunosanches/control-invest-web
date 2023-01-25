<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category as ICategory } from "@prisma/client";

import Button from '~/components/TheButton.vue';

const categories: any = ref<ICategory[]>([])

onMounted(async () => {
  const { data } = await useFetch<ICategory[]>('/api/category')
  categories.value = data.value
})
</script>

<template>
  <h2 class="text-2xl">Categorias</h2>

  <div class="flex justify-end">
    <NuxtLink to="categories/new">
      <Button  type="button" color="default">
        Adicionar
      </Button>
    </NuxtLink>
  </div>

  <ul>
    <li v-for="item in categories" :key="item.name">
      {{ item.name }}
    </li>
  </ul>
</template>