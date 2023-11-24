<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useTransactionStore } from "~/store/transaction"
import { formatCurrency } from "~/utils/currency"

const { transactions } = storeToRefs(useTransactionStore())

import type { TransactionWithIncludes } from "~/store/transaction"
import type { ItemActionType } from "~/types"

const emit = defineEmits<{
  (e: 'handleClick', transaction: TransactionWithIncludes, action: ItemActionType)
}>()
</script>

<template>
  <base-table>
    <template #head>
      <tr class="bg-slate-200/60">
        <td class="w-24 px-3 py-4">Situação</td>
        <td class="w-28 px-3 py-4">Data</td>
        <td class="px-3 py-4">Valor</td>
        <td class="px-3 py-4">Descrição</td>
        <td class="px-3 py-4">Catecoria</td>
        <td class="px-3 py-4">Sub Catecoria</td>
        <td class="px-3 py-4">Conta</td>
        <td class="w-24 px-3 py-4">Ações</td>
      </tr>
    </template>

    <template #body>
      <base-table-body-row v-for="transaction in transactions">
        <td class="w-24 px-3 py-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path v-if="transaction.isActive" stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </td>
        <td class="w-28 px-3 py-4">
          {{
            formatDate({
              date: transaction.date,
              formatOptions: { day: '2-digit', month: '2-digit', year: 'numeric' }
            })
          }}
        </td>
        <td
          :class="[
            transaction.type.slug.includes('earnings') && 'text-green-500',
            transaction.type.slug.includes('expenses') && 'text-red-500'
          ].join(' ')"
          class="px-3 py-4"
        >
          {{ formatCurrency({ value: transaction.value }) }}
        </td>
        <td class="px-3 py-4">
          {{ transaction.description }}
        </td>
        <td class="px-3 py-4">{{ transaction.category.name }}</td>
        <td class="px-3 py-4">{{ transaction.subCategory.name }}</td>
        <td class="px-3 py-4">{{ transaction.account.name }}</td>
        <td class="w-30 px-3 py-4">
          <div class="flex gap-2">
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClick', transaction, 'update')"
            >
              <icons-edit class="text-blue-500 hover:text-blue-400" />
            </form-kit>
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClick', transaction, 'delete')"
            >
              <icons-delete class="text-rose-600 hover:text-rose-500" />
            </form-kit>
          </div>
        </td>
      </base-table-body-row>
    </template>

    <template #foot>
      <tr>
        <td class="px-6 py-4 last:text-right" colspan="2">
          <span>&nbsp;</span>
        </td>
      </tr>
    </template>
  </base-table>
</template>
