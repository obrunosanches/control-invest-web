<script setup lang="ts">
import type { TransactionWithIncludes } from "~/store/transaction"

const props = defineProps<{
  transactions: TransactionWithIncludes[]
}>()
</script>

<template>
  <base-table>
    <template #head>
      <tr class="bg-slate-200/60">
        <td class="w-24 px-3 py-4">Situação</td>
        <td class="w-28 px-3 py-4">Data</td>
        <td class="px-3 py-4">Descrição</td>
        <td class="px-3 py-4">Catecoria</td>
        <td class="px-3 py-4">Conta</td>
        <td class="px-3 py-4">Valor</td>
        <td class="w-24 px-3 py-4">Ações</td>
      </tr>
    </template>

    <template #body>
      <base-table-body-row v-for="transaction in props.transactions">
        <td class="w-24 px-3 py-4 flex items-center justify-center">
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <g v-if="transaction.isActive" transform="translate(17162 10827)">
              <circle cx="12" cy="12" r="12" transform="translate(-17162 -10827)" fill="#4caf50" />
              <path d="M14.127,6,7.165,12.962,4,9.8" transform="translate(-17159.064 -10824.481)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </g>
            <g v-else transform="translate(-960 -977.271)">
              <g transform="translate(960 977.271)">
                <circle data-name="Elipse 298" cx="12" cy="12" r="12" fill="#f74444" />
              </g>
              <g transform="translate(972 983.811)">
                <line y2="5.558" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                <line transform="translate(0 10.117)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
              </g>
            </g>
          </svg>
        </td>
        <td class="w-28 px-3 py-4">
          {{
            formatDate({
              date: transaction.date,
              formatOptions: { day: '2-digit', month: '2-digit', year: 'numeric' }
            })
          }}</td>
        <td class="px-3 py-4">
          {{ transaction.description }}
        </td>
        <td class="px-3 py-4">{{ transaction.category.name }}</td>
        <td class="px-3 py-4">{{ transaction.account.name }}</td>
        <td class="px-3 py-4">{{ transaction.value }}</td>
        <td class="w-30 px-3 py-4">
          <div class="flex gap-2">
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClickCategory', category, 'update')"
            >
              <icons-edit class="text-indigo-500 hover:text-indigo-400" />
            </form-kit>
            <form-kit
              type="button"
              wrapper-class="flex"
              :ignore="false"
              @click="emit('handleClickCategory', category, 'delete')"
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
