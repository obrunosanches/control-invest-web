<script setup lang="ts">
import { useTransactionStore } from "~/store/transaction"

import type { DateSelected } from "~/types"

const { fetchTransaction } = useTransactionStore()

const handleDateSelected = async (event: DateSelected) => {
  await fetchTransaction(event.month, event.year)
}
</script>

<template>
  <month-year-selected @handle-click-date-select="handleDateSelected" />
</template>
