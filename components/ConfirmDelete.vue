<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'handleClick', action: 'confirm' | 'cancel'): void
}>()
</script>

<template>
  <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>

  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
    Tem certeza que deseja excluir: "{{ props.name }}"?
  </h3>

  <div class="flex justify-center gap-4">
    <form-kit
      type="button"
      label="Confirmar"
      input-class="bg-red-600 hover:bg-red-800 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
      @click="emit('handleClick', 'confirm')"
    />

    <form-kit
      type="button"
      label="Cancelar"
      input-class="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-2.5 px-5 font-medium rounded-lg text-sm border border-gray-500"
      @click="emit('handleClick', 'cancel')"
    />
  </div>
</template>
