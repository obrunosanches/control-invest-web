<script setup lang="ts">
import type { Category as ICategory, CategoryType as ICategoryType, } from "@prisma/client";

import { hide } from "~/plugins/modal";

import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';
import BaseTable from '~/components/Table/BaseTable.vue';
import BaseTableHead from '~/components/Table/BaseTable.Head.vue';
import BaseTableHeadCell from '~/components/Table/BaseTable.HeadCell.vue';
import BaseTableBody from '~/components/Table/BaseTable.Body.vue';
import BaseTableRow from '~/components/Table/BaseTable.BodyRow.vue';
import BaseTableCell from '~/components/Table/BaseTable.BodyCell.vue';
import AddRegisttryIcon from '~~/components/Icons/AddRegisttryIcon.vue';
import EditRegisttryIcon from '~~/components/Icons/EditRegisttryIcon.vue';
import RemoveRegisttryIcon from '~~/components/Icons/RemoveRegisttryIcon.vue';


interface ICategoryWithType extends ICategory {
  type: ICategoryType;
}

// TODO: Use pinia to control store

const categoryModalTarget: string = "categoryModal"
const categoryTypeModalTarget: string = "categoryTypeModal"

const { data: categories } = await useAsyncData<ICategoryWithType[]>('category', () => $fetch(`/api/category`))
const { data: categoryTypes } = await useAsyncData<ICategoryType[]>('categoryTypes', () => $fetch(`/api/category/type`))

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  if (form.getAttribute('id')?.includes('type')) {
    const description = formData.get("description")

    const { data: accountType } = await useFetch('/api/account/type', {
      method: 'post',
      body: {
        description
      }
    })

    form.reset()
    categoryTypes.value?.push(accountType.value as ICategoryType)
    hide(categoryTypeModalTarget)
    return void 0
  }
  
  form.reset()
}
</script>

<template>
  <h2 class="text-2xl">Categorias</h2>

  <div class="flex justify-end">
    <Button type="button" color="default" v-modal-show="categoryModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="categoryModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="categoryModalTarget" title="Cadastrar nova categoria" />
    <form id="category" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="name" label="Nome" />
        </fieldset>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <Select name="typeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in categoryTypes" :key="id" :value="id">
                {{ description }}
              </option>
            </Select>
          </fieldset>

          <Button type="button" color="default" v-modal-show="categoryTypeModalTarget">
            Tipo
          </Button>
        </div>
      </ModalBody>
      <ModalFooter class="text-right">
        <Button type="submit" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>

  <Modal ref="modalElement" :target="categoryTypeModalTarget" size="md" position="top-center" class="mt-16">
    <ModalHeader :target="categoryTypeModalTarget" title="Cadastrar novo tipo de categoria" />
    <form id="category-type" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="description" label="Descrição" />
        </fieldset>
      </ModalBody>
      <ModalFooter class="text-right">
        <Button type="submit" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>

  <BaseTable v-if="categories?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <BaseTableHead class="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Name</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">actions</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow v-for="item in categories" :key="item.name">
        <BaseTableCell>
          {{ item.name }}
        </BaseTableCell>
        <BaseTableCell class="flex justify-end items-center gap-2">
          <router-link :to="`categories/${item.id}`">
            <AddRegisttryIcon class="text-green-600" />
          </router-link>
          <router-link :to="`categories/${item.id}`">
            <EditRegisttryIcon class="text-blue-600" />
          </router-link>
          <router-link :to="`categories/${item.id}`">
            <RemoveRegisttryIcon class="text-red-500" />
          </router-link>
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
</template>