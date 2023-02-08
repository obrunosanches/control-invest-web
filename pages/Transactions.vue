<script setup lang="ts">
import { hide } from '~/plugins/modal';

import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';

const transactionModalTarget: string = "accountModal"

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = Object.fromEntries(new FormData(form))

  form.reset()
  hide(transactionModalTarget)
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
        <fieldset class="flex-auto">
          <FormInput name="description" label="Descrição" />
        </fieldset>
        
        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="basis-2/4">
            <Select name="accountId" label="Conta">
              <option selected>Selecione a conta</option>
            </Select>
          </fieldset>

          <fieldset class="flex-1">
            <FormInput name="value" label="Valor" />
          </fieldset>

          <fieldset class="flex-1">
            <FormInput name="date" type="date" label="Data" />
          </fieldset>
        </div>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-1">
            <Select name="categoryId" label="Categoria">
              <option selected>Selecione a categoria</option>
            </Select>
          </fieldset>

          <fieldset class="flex-1">
            <Select name="subCategoryId" label="Sub Categoria">
              <option selected>Selecione a sub categoria</option>
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