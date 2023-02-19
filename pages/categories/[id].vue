<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Category as ICategory, SubCategory as ISubCategory } from "@prisma/client";

import { hide } from '~/plugins/modal'

import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';

// TODO: Use pinia to control store
const route = useRoute()
const { id: categoryId } = route.params
const modalId: string = "defaultModal"

const { data: catogory } = await useAsyncData<ICategory>('categoryByID', () => $fetch(`/api/category/${categoryId}`))
const { data: subCategories } = await useAsyncData<ISubCategory[]>('subCategories', () => $fetch(`/api/category/sub-category/${categoryId}`))

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get("name")

  const { data: subCategory } = await useFetch(`/api/category/sub-category/${categoryId}`, {
    method: 'post',
    body: {
      name,
      categoryId: catogory.value?.id
    }
  })

  form.reset()
  hide(modalId)
  subCategories.value?.push(subCategory.value as ISubCategory)
}
</script>

<template>
  <h2 class="text-2xl">{{ catogory?.name }}</h2>

  <div class="flex justify-end">
    <Button type="button" color="default" v-show-modal="modalId">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="modalId" position="top-center" class="mt-16">
    <ModalHeader :target="modalId" title="Cadastrar sub categoria" />
    <form novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="name" label="Nome" />
        </fieldset>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>

  <base-table v-if="subCategories?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Name</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in subCategories" :key="item.name">
        <base-table-body-cell>
          {{ item.name }}
        </base-table-body-cell>
        <base-table-body-cell class="flex justify-end items-center gap-2">
          <icons-edit-registtry-icon class="text-blue-600" />
          <icons-remove-registtry-icon class="text-red-500" />
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>