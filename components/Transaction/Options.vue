<script setup lang="ts">
import { useTransactionTypeStore } from "~/store/transactionType"
import { useTransactionStore } from "~/store/transaction"

import type { TransactionTypesOptions } from "~/types"

const transactionStore = useTransactionStore()
const transactionTypeStore = useTransactionTypeStore()

const { setFormActionType, setTransactionTypeOption } = transactionStore
const { fetchTransactionTypes, getDefaultTransactionTypes } = transactionTypeStore

const OPTIONS_ICONS = {
  'EXPENSES': defineAsyncComponent(() => import('~/components/Icons/Expenses.vue')),
  'EARNINGS': defineAsyncComponent(() => import('~/components/Icons/Earnings.vue')),
  'TRANSFER': defineAsyncComponent(() => import('~/components/Icons/Transfer.vue'))
}

const containerOptions = ref<HTMLDivElement>()
const shouldShowOptions = ref<boolean>(false)

onBeforeMount(async () => await fetchTransactionTypes())

const emit = defineEmits<{
  (e: 'handleClick', option: TransactionTypesOptions): void
}>()

const handleActionOptions = (option: TransactionTypesOptions) => {
  setFormActionType('create')
  setTransactionTypeOption(option)
  emit('handleClick', option)
}

const toggleOptions = (event: Event) => {
  const target = event.target as HTMLElement

  if (shouldShowOptions.value && containerOptions.value !== target) {
    shouldShowOptions.value = false
    return document.removeEventListener('click', toggleOptions)
  }

  shouldShowOptions.value = !shouldShowOptions.value
}

const handleShowOptions = () => {
  document.addEventListener('click', toggleOptions)

  document.addEventListener('keydown', {
    handleEvent: function (event: KeyboardEvent) {
      if (event.key === "Escape") {
        shouldShowOptions.value = false
        document.removeEventListener(event.type, this, false)
      }
    }
  }, false)
}
</script>

<template>
  <div class="px-3 mt-4 relative">
    <form-kit
      type="button"
      label="Novo"
      input-class="bg-purple-700 hover:bg-purple-600 text-white py-4 px-5 font-medium rounded-full w-4/5"
      :ignore="false"
      @click="handleShowOptions"
    >
      <div class="flex items-center gap-4">
        <icons-plus class="text-white" stroke-width="2" />
        <span>Novo</span>
      </div>
    </form-kit>

    <client-only>
      <div
        v-show="shouldShowOptions"
        ref="containerOptions"
        class="flex rounded-2xl shadow-2xl shadow-gray-500 bg-white border border-black[0.07] absolute left-3 top-0 py-8 px-8 pr-16 min-w-full"
      >
        <ul class="space-y-6">
          <li v-for="option in [
              ...getDefaultTransactionTypes().map(type => ({ value: type.slug, label: type.description })),
              { value: 'transfer', label: 'Transferência' }
            ]"
          >
            <form-kit
              type="button"
              :ignore="false"
              @click="handleActionOptions(option.value)"
            >
              <div class="flex items-center gap-4">
                <component
                  :class="[
                    option.value.includes('earnings') && 'text-green-500',
                    option.value.includes('expenses') && 'text-red-500',
                    option.value.includes('transfer') && 'text-blue-500',
                  ].join(' ')"
                  :is="OPTIONS_ICONS[option.value.toUpperCase()]"
                />
                <span>{{ option.label }}</span>
              </div>
            </form-kit>
          </li>
        </ul>
      </div>
    </client-only>
  </div>
</template>
