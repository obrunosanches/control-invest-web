<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Category as ICategory } from "@prisma/client";

import Button from '~/components/TheButton.vue';

// TODO: Use pinia to control store

const route = useRoute()
const { data: catogory } = await useAsyncData<ICategory>('categoryByID', () => $fetch(`/api/category/${route.params.id}`))
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