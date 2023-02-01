<script setup lang="ts">
import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';

const accountModalTarget: string = "accountModal"

const handleSubmit = async (event: Event): Promise<void> => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  form.reset()
}
</script>

<template>
  <h1 class="text-gray-300 text-3xl font-bold">
    Contas
  </h1>

  <div class="flex justify-end">
    <Button type="button" color="default" v-modal-show="accountModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="accountModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="accountModalTarget" title="Cadastrar tipo de conta" />
    <form id="account" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <fieldset>
          <FormInput name="description" label="Descrição" />
        </fieldset>
        <div class="flex mt-6 gap-4 items-end">

          <fieldset class="flex-auto">
            <Select name="accountTypeId" label="Tipo">
              <option selected>Selecione o tipo</option>
            </Select>
          </fieldset>

          <Button type="button" color="default">
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
</template>