<script setup lang="ts">
import type { Account as IAccount, Category as ICategory, SubCategory as ISubCategory } from "@prisma/client";


import { hide } from '~/plugins/modal';

import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';

const transactionModalTarget: string = "accountModal"

const { data: accounts } = await useAsyncData<IAccount[]>('account', () => $fetch('/api/account'))
const { data: categories } = await useAsyncData<ICategory[]>('category', () => $fetch(`/api/category`))
const subCategories = ref<ISubCategory[]>([])

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = Object.fromEntries(new FormData(form))

  console.log('formData', formData)

  form.reset()
  hide(transactionModalTarget)
}

const selectSubCategory = async (event: Event) => {
  const category = event.target as HTMLSelectElement
  const categoryId = category.value

  const { data } = await useFetch<ISubCategory[]>(`/api/category/sub-category/${categoryId}`)

  subCategories.value = data.value as ISubCategory[]
}
</script>

<template>
  <h1 class="text-gray-300 text-3xl font-bold">
    Transações
  </h1>

  <div class="flex justify-end">
    <Button type="button" color="default" v-modal-show="transactionModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="transactionModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="transactionModalTarget" title="Cadastrar transação" />
    <form id="account" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <div class="flex gap-4 items-end">
          <fieldset class="flex-1">
            <FormInput name="value" label="Valor" />
          </fieldset>

          <fieldset class="flex-1">
            <FormInput name="date" type="date" label="Data" />
          </fieldset>

          <fieldset class="basis-2/4">
            <Select name="accountId" label="Conta">
              <option v-for="{ id, name } in accounts" :key="id" :value="id">
                {{ name }}
              </option>
            </Select>
          </fieldset>
        </div>

        <fieldset class="flex-auto mt-6">
          <FormInput name="description" label="Descrição" />
        </fieldset>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-1">
            <Select name="categoryId" label="Categoria" @change="selectSubCategory">
              <option selected>Selecione a categoria</option>
              <option v-for="{ id, name } in categories" :key="id" :value="id">
                {{ name }}
              </option>
            </Select>
          </fieldset>

          <fieldset class="flex-1">
            <Select name="subCategoryId" label="Sub Categoria">
              <option selected>Selecione a sub categoria</option>
              <option v-for="{ id, name } in subCategories" :key="id" :value="id">
                {{ name }}
              </option>
            </Select>
          </fieldset>
        </div>
      </ModalBody>
      <ModalFooter class="text-right">
        <Button type="submit" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>
</template>