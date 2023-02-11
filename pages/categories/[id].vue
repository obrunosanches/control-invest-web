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
import BaseTable from '~/components/Table/BaseTable.vue';
import BaseTableHead from '~/components/Table/BaseTable.Head.vue';
import BaseTableHeadCell from '~/components/Table/BaseTable.HeadCell.vue';
import BaseTableBody from '~/components/Table/BaseTable.Body.vue';
import BaseTableRow from '~/components/Table/BaseTable.BodyRow.vue';
import BaseTableCell from '~/components/Table/BaseTable.BodyCell.vue';
import EditRegisttryIcon from '~/components/Icons/EditRegisttryIcon.vue';
import RemoveRegisttryIcon from '~/components/Icons/RemoveRegisttryIcon.vue';

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

  <BaseTable v-if="subCategories?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <BaseTableHead class="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Name</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">actions</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow v-for="item in subCategories" :key="item.name">
        <BaseTableCell>
          {{ item.name }}
        </BaseTableCell>
        <BaseTableCell class="flex justify-end items-center gap-2">
          <EditRegisttryIcon class="text-blue-600" />
          <RemoveRegisttryIcon class="text-red-500" />
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
</template>