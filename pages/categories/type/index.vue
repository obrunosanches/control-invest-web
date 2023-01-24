<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CategoryType as ICategoryType } from "@prisma/client";

import Button from '~/components/TheButton.vue';

const categoryTypes: any = ref<ICategoryType[]>([])

onMounted(async () => {
  const { data } = await useFetch<ICategoryType[]>('/api/category/type')
  categoryTypes.value = data.value
})
</script>

<template>
  <h2 class="text-2xl">Tipo de categoria</h2>

  <div class="flex justify-end">
    <NuxtLink to="type/new">
      <Button type="button" color="default">
        Adicionar
      </Button>
    </NuxtLink>
  </div>

  <ul>
    <li v-for="item in categoryTypes" :key="item.id">
      {{ item.description }}
    </li>
  </ul>
  
</template>