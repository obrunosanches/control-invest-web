<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useTransactionStore } from "~/store/transaction"
import { useAccountStore } from "~/store/account"

import { formatCurrency } from "~/utils/currency"

const { getTransactionBalance } = useTransactionStore()
const accountStore = useAccountStore()

const { getAccountBalance } = accountStore

const { accounts } = storeToRefs(accountStore)

const balance = computed(() => getAccountBalance())
const earnings = computed(() => getTransactionBalance('earnings'))
const expenses = computed(() => getTransactionBalance('expenses'))
const globalBalance = computed(() => earnings.value - expenses.value)
</script>

<template>
  <section v-bind="useAttrs()">
    <div class="flex gap-4 font-bold text-gray-500">
      <div
        v-for="account in accounts"
        class="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl"
      >
        <div class="flex gap-1 items-center p-4">
          <span>{{ account.name }}</span>

          <span class="font-medium"> > </span>

          <span
            :class="[account.balance < 0 && 'text-red-500'].join(' ')"
            class="block text-xl font-bold"
          >
            {{ formatCurrency({ value: account.balance }) }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex gap-4 mt-4">
      <div class="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl p-4">
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

      <div class="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl p-4">
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

      <div class="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl p-4">
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

      <div class="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl p-4">
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
    </div>
  </section>
</template>
