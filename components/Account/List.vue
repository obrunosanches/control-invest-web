<script setup lang="ts">
import type { Account } from "@prisma/client"
import type { ItemActionType } from "~/types"
import type { AccountWithIncludes } from "~/store/account"
import { formatCurrency } from "~/utils/currency"

const props = defineProps<{
  accounts: AccountWithIncludes[]}
>()

const emit = defineEmits<{
  (e: 'handleClick', account: Account, action: ItemActionType): void
}>()
</script>

<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-4 mt-6">
    <div
      v-for="account in props.accounts"
      class="bg-white border border-black[0.07] rounded-2xl p-8"
    >
      <header class="flex">
        <div class="flex-auto">
          <span class="block font-bold">{{ account.name }}</span>
          <span class="block font-bold mt-4">
            Saldo atual:
            <span class="text-green-500">
              {{ formatCurrency({ value: account.balance }) }}
            </span>
          </span>
        </div>
        <div class="flex gap-4">
          <form-kit
            type="button"
            wrapper-class="flex"
            :ignore="false"
            @click="emit('handleClick', account, 'update')"
          >
            <icons-edit class="text-blue-500 hover:text-blue-400" />
          </form-kit>
          <form-kit
            type="button"
            wrapper-class="flex"
            :ignore="false"
            @click="$emit('handleClick', account, 'delete')"
          >
            <icons-delete class="text-rose-600 hover:text-rose-500" />
          </form-kit>
        </div>
      </header>

      <div class="flex gap-4 mt-6">
        <div class="basis-1/3">
          <form-kit
            type="button"
            wrapper-class="flex"
            input-class="flex gap-2"
            :ignore="false"
          >
            <icons-plus-circle class="text-lime-600 hover:text-lime-500" />
            Receita
          </form-kit>
        </div>
        <div class="basis-1/3">
          <form-kit
            type="button"
            wrapper-class="flex"
            input-class="flex gap-2"
            :ignore="false"
          >
            <icons-plus-circle class="text-red-600 hover:text-red-500" />
            Despesa
          </form-kit>
        </div>
        <div class="basis-1/3">
          <form-kit
            type="button"
            wrapper-class="flex"
            input-class="flex gap-2"
            :ignore="false"
          >
            <icons-transaction />
            Transações
          </form-kit>
        </div>
      </div>
    </div>
  </div>
</template>
