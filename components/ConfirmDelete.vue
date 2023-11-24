<script setup lang="ts">
import { useAccountStore } from "~/store/account"
import { useCategoryStore } from "~/store/category"

const { getAccount } = useAccountStore()
const { getCategory } = useCategoryStore()

import type { FormValues } from "~/types/transactions"

const props = defineProps<{
  name: string
  formValues: FormValues
}>()

const emit = defineEmits<{
  (e: 'handleClick', action: 'confirm' | 'cancel'): void
}>()
</script>

<template>
  <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none"
    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>

  <h3 class="text-lg font-normal text-gray-500">
    Tem certeza que deseja excluir: "{{ props.name }}"?
  </h3>

  <div
    class="mt-5 space-y-2"
    v-if="props.formValues.transfer"
  >
    <span class="block font-medium">
      {{ getCategory(props.formValues.categoryId).type.description }}
    </span>
    <div class="flex items-center justify-center gap-4">
      <div class="flex gap-2">
        <span class="font-bold">De:</span> {{ getAccount(props.formValues.transfer.accountFromId).name }}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Para:</span> {{ getAccount(props.formValues.transfer.accountToId).name }}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Valor:</span> {{ formatCurrency({ value: Number(formValues.value) }) }}
      </div>
    </div>
  </div>

  <div class="flex justify-center gap-4 mt-8">
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
