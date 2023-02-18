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
import AddRegisttryIcon from '~~/components/Icons/AddRegisttryIcon.vue';
import EditRegisttryIcon from '~~/components/Icons/EditRegisttryIcon.vue';
import RemoveRegisttryIcon from '~~/components/Icons/RemoveRegisttryIcon.vue';

interface ICategoryWithType extends ICategory {
  type: ICategoryType;
}

type actionCategoryFormModalType = 'new' | 'edit'

// TODO: Use pinia to control store

const categoryModalTarget: string = "categoryModal"
const categoryDeleteModalTarget: string = "categoryDeleteModal"
const categoryTypeModalTarget: string = "categoryTypeModal"
const categorySelected = ref<ICategoryWithType | null>(null)
const actionCategoryFormModal = ref<actionCategoryFormModalType>('new')

const { data: categories } = await useAsyncData<ICategoryWithType[]>('category', () => $fetch(`/api/category`))
const { data: categoryTypes } = await useAsyncData<ICategoryType[]>('categoryTypes', () => $fetch(`/api/category/type`))

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  if (form.getAttribute('id')?.includes('type')) {
    const description = formData.get("description")

    const { data: categoryType } = await useFetch('/api/category/type', {
      method: 'post',
      body: {
        description
      }
    })

    form.reset()
    categoryTypes.value?.push(categoryType.value as ICategoryType)
    hide(categoryTypeModalTarget)
    return void 0
  }

  const name = formData.get("name")
  const typeId = formData.get("typeId")

  const { data: category } = await useFetch('/api/category', {
    method: 'post',
    body: {
      name,
      typeId
    }
  })

  const type = categoryTypes.value?.find(item => item.id === typeId) as ICategoryType
  const categoryWithType = {
    ...category.value,
    type
  } as ICategoryWithType

  form.reset()
  categories.value?.push(categoryWithType)
  hide(categoryModalTarget)
}

const selected = (item: ICategoryWithType | null) => {
  actionCategoryFormModal.value = item === null ? 'new' : 'edit'
  categorySelected.value = item
}

const titleCategoryModal = computed(() => actionCategoryFormModal.value === 'new' ? 'Cadastrar nova categoria' : 'Editar categoria')
</script>

<template>
  <h2 class="text-2xl">Categorias</h2>

  <div class="flex justify-end">
    <Button type="button" color="default" @click="selected(null)" v-show-modal="categoryModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="categoryModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="categoryModalTarget" :title="titleCategoryModal" />
    <form id="category" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="name" label="Nome" :value="categorySelected?.name" />
        </fieldset>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <Select name="typeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in categoryTypes" :key="id" :value="id"
                :selected="categorySelected?.typeId === id">
                {{ description }}
              </option>
            </Select>
          </fieldset>

          <Button type="button" color="default" v-show-modal="categoryTypeModalTarget">
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

  <Modal ref="modalElement" :target="categoryDeleteModalTarget" size="md" position="top-center" class="mt-16">
    <ModalHeader :target="categoryDeleteModalTarget" />
    <ModalBody :hasTitle="false">
      <div class="p-6 text-center">
        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
          stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tem certeza que deseja excluir: "{{ categorySelected?.name }}"?
        </h3>
        <button v-hide-modal="categoryDeleteModalTarget" type="button"
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Confirmar
        </button>
        <button v-hide-modal="categoryDeleteModalTarget" type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Cancelar
        </button>
      </div>
    </ModalBody>
  </Modal>

  <base-table v-if="categories?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Name</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in categories" :key="item.name">
        <base-table-body-cell>
          {{ item.name }}
        </base-table-body-cell>
        <base-table-body-cell class="flex justify-end items-center gap-2">
          <router-link :to="`categories/${item.id}`">
            <AddRegisttryIcon class="text-green-600" />
          </router-link>
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="categoryModalTarget">
            <EditRegisttryIcon class="text-blue-600" />
          </Button>
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="categoryDeleteModalTarget">
            <RemoveRegisttryIcon class="text-red-500" />
          </Button>
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>