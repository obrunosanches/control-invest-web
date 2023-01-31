<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Category as ICategory } from "@prisma/client";

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
</script>

<template>
  <h2 class="text-2xl">{{ catogory?.name }}</h2>

  <div class="flex justify-end">
    <Button type="button" color="default" v-modal-show="modalId">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="modalId" position="top-center" class="mt-16">
    <ModalHeader :target="modalId" title="Cadastrar sub categoria" />
    <form novalidate>
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="name" label="Descrição" />
        </fieldset>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="default">
          Confirmar
        </Button>
      </ModalFooter>
    </form>
  </Modal>
</template>