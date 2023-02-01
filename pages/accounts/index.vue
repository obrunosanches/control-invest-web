<script setup lang="ts">
import { AccountType as IAccountType } from '@prisma/client'

import { hide } from '~/plugins/modal';

import Button from '~/components/TheButton.vue';
import Modal from '~/components/Modal/TheModal.vue';
import ModalHeader from '~/components/Modal/TheModal.Header.vue';
import ModalBody from '~/components/Modal/TheModal.Body.vue';
import ModalFooter from '~/components/Modal/TheModal.Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';

const { data: accountTypes } = await useAsyncData<IAccountType[]>('accountTypes', () => $fetch('/api/account/type'))

const accountModalTarget: string = "accountModal"
const accountTypeModalTarget: string = "accountTypeModal"

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
    accountTypes.value?.push(accountType.value as IAccountType)
    hide(accountTypeModalTarget)
    return void 0
  }

  const name = formData.get("name")
  const accountTypeId = formData.get("accountTypeId")
  const initialBalance = formData.get("initialBalance")

  await useFetch('/api/account', {
    method: 'post',
    body: {
      name,
      accountTypeId,
      initialBalance
    }
  })

  form.reset()
  hide(accountModalTarget)
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
        <div class="flex gap-4 items-end">
          <fieldset class="flex-auto">
            <FormInput name="name" label="Nome" />
          </fieldset>

          <fieldset class="flex-auto">
            <FormInput name="initialBalance" label="Valor inicial" />
          </fieldset>
        </div>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <Select name="accountTypeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in accountTypes" :key="id" :value="id">
                {{ description }}
              </option>
            </Select>
          </fieldset>

          <Button type="button" color="default" v-modal-show="accountTypeModalTarget">
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

  <Modal ref="modalElement" :target="accountTypeModalTarget" size="md" position="top-center" class="mt-16">
    <ModalHeader :target="accountTypeModalTarget" title="Cadastrar tipo de conta" />
    <form id="account-type" novalidate @submit.prevent="handleSubmit">
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
</template>