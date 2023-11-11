<script setup lang="ts">
import { formatCurrency } from "~/utils/currency"
import { useTransactionStore } from "~/store/transaction"

const { getBalance } = useTransactionStore()

const balance = computed(() => getBalance())
const earnings = computed(() => getBalance('earnings'))
const expenses = computed(() => getBalance('expenses'))
const globalBalance = computed(() => earnings.value - expenses.value)
</script>

<template>
<div class="flex-auto bg-white border border-black[0.07] rounded-2xl p-4">
  <span class="block text-gray-500 font-medium">
    Saldo Atual >
  </span>
  <span
    :class="[balance < 0 && 'text-red-500'].join(' ')"
    class="block text-xl font-bold mt-2"
  >
    {{ formatCurrency({ value: balance }) }}
  </span>
</div>
<div class="flex-auto bg-white border border-black[0.07] rounded-2xl p-4">
  <span class="block text-gray-500 font-medium">
    Receitas >
  </span>
  <span
    :class="[earnings < 0 && 'text-red-500'].join(' ')"
    class="block text-xl font-bold mt-2"
  >
    {{ formatCurrency({ value: earnings }) }}
  </span>
</div>
<div class="flex-auto bg-white border border-black[0.07] rounded-2xl p-4">
  <span class="block text-gray-500 font-medium">
    Despesas >
  </span>
  <span
    :class="[expenses < 0 && 'text-red-500'].join(' ')"
    class="block text-xl font-bold mt-2"
  >
    {{ formatCurrency({ value: expenses }) }}
  </span>
</div>
<div class="flex-auto bg-white border border-black[0.07] rounded-2xl p-4">
  <span class="block text-gray-500 font-medium">
    Balanço mensal >
  </span>
  <span
    :class="[globalBalance < 0 && 'text-red-500'].join(' ')"
    class="block text-xl font-bold mt-2"
  >
    {{ formatCurrency({ value: globalBalance }) }}
  </span>
</div>
</template>
