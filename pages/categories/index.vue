<script setup lang="ts">
import Button from '~/components/TheButton.vue';
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
</template>