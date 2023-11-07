<script setup lang="ts">
import { useTransactionStore } from "~/store/transaction"

import type { DateSelected } from "~/types"

const { fetchTransaction } = useTransactionStore()

const modalTarget = 'main-modal'
const transactionFormId = 'transaction-form'

const handleDateSelected = async (event: DateSelected) => {
  await fetchTransaction(event.month, event.year)
}
</script>

<template>
  <client-only>
    <div class="flex justify-between gap-4 mt-6">
      <div class="w-1/3">
        <form-select
          name="accountTypeId"
          input-class="w-full bg-purple-700 hover:bg-purple-600 text-white py-3.5 px-5 font-medium rounded-full text-sm"
          :options="[{
            label: 'Transações',
            value: 'transacos'
          }, {
            label: 'Despesas',
            value: 'despesas'
          }, {
            label: 'Receitas',
            value: 'receitas'
          }, {
            label: 'Transferências',
            value: 'transferencias'
          }]"
        />
      </div>

      <div class="items-end">
        <form-kit
          type="button"
          label="Nova Receita"
          class="w-fit"
          input-class="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white py-3 px-5 font-medium rounded-full text-sm"
          v-show-modal="modalTarget"
          :ignore="false"
        >
          <icons-plus class="w-[14px] h-[14px]" stroke-width="2.5" />
          <span>Nova</span>
        </form-kit>
      </div>
    </div>

    <div class="mt-8">
      <month-year-selected @handle-click-date-select="handleDateSelected" />
    </div>

    <base-modal
      ref="modalTarget"
      :target="modalTarget"
      :title="'Transação'"
      size="3xl"
    >
      <template #body>
        <form-kit
          :id="transactionFormId"
          type="form"
          :actions="false"
          :incomplete-message="false"
        >
          <div class="p-6">
            <div class="flex gap-4">
              <div class="basis-2/4">
                <div class="flex gap-4">
                  <div class="flex-1">
                    <form-input
                      name="value"
                      label="Valor"
                      validation="required:trim"
                    />
                  </div>

                  <div class="flex-1">
                    <form-input
                      type="date"
                      name="date"
                      label="Data"
                      validation="required:trim"
                    />
                  </div>
                </div>
              </div>
              <div class="basis-2/4">
                <form-select
                  name="accountId"
                  label="Conta"
                  :options="[{
                      label: 'Itaú',
                      value: 'cb23c245234j5j2345'
                    }]"
                />
              </div>
            </div>

            <div class="flex mt-6">
              <form-input
                name="description"
                label="Descrição"
                validation="required:trim"
              />
            </div>

            <div class="flex gap-4 mt-6">
              <form-select
                name="categoryId"
                label="Categoria"
                :options="[{
                  label: 'Benefícios',
                  value: 'bwe4jb23452j34b5jb23j'
                }]"
              />

              <form-select
                name="categoryId"
                label="Categoria"
                :options="[{
                  label: 'Salário',
                  value: 'cw34uc534c5i34c5ic234'
                }]"
              />
            </div>
          </div>

          <section class="p-6 rounded-b border-t border-gray-600 text-right">
            <form-kit
              type="submit"
              input-class="bg-purple-700 hover:bg-purple-600 text-white py-2.5 px-5 font-medium rounded-lg text-sm"
              label="Confirmar"
            />
          </section>
        </form-kit>
      </template>
    </base-modal>
  </client-only>
</template>
