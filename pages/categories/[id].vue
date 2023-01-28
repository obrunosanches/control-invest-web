<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category as ICategory } from "@prisma/client";

import Button from '~/components/TheButton.vue';

const route = useRoute()

// TODO: Control categories with state, try to use pinia
const catogory = ref<ICategory>()

onMounted(async () => {
  const { data } = await useFetch<ICategory>(`/api/category/${route.params.id}`)

  if (data.value) {
    catogory.value = data.value ?? {}
  }
})
</script>

<template>
  <h2 class="text-2xl">{{ catogory?.name }}</h2>

  <div class="flex justify-end">
    <NuxtLink to="#">
      <Button type="button" color="default">
        Adicionar
      </Button>
    </NuxtLink>
  </div>
</template>