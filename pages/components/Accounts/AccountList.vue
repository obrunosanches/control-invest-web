<script setup lang="ts">
import type { Account } from "@prisma/client"
import type { AccountActionType } from "~/types/accounts"

const props = defineProps<{
  accounts: AccountWithType[]}
>()

const emit = defineEmits<{
  (e: 'handleClick', account: Account, action: AccountActionType): void
}>()
</script>

<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-6">
    <div
      v-for="account in props.accounts"
      class="rounded-2xl bg-white p-8"
    >
      <header class="flex">
        <span class="flex-auto">{{ account.name }}</span>
        <div class="flex gap-4">
          <form-kit
            type="button"
            label="Editar"
            input-class="text-green-600"
            @click="emit('handleClick', account, 'update')"
          >
            Editar
          </form-kit>

          <form-kit
            type="button"
            label="Remover"
            input-class="text-red-600"
            @click="$emit('handleClick', account, 'delete')"
          />
        </div>
      </header>

      <div class="flex gap-4 mt-6">
        <div class="basis-1/3">
          <form-kit
            type="button"
            label="Adicionar receita"
            input-class="w-full bg-transparent border rounded p-3"
          />
        </div>
        <div class="basis-1/3">
          <form-kit
            type="button"
            label="Adicionar depesa"
            input-class="w-full bg-transparent border rounded p-3"
          />
        </div>
        <div class="basis-1/3">
          <form-kit
            type="button"
            label="Ver transações"
            input-class="w-full bg-transparent border rounded p-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>
