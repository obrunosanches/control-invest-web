<script setup lang="ts">
import { Account, AccountType } from '@prisma/client'

import { hide } from '~/plugins/modal';

import Button from '~/components/TheButton.vue';
import Modal from '~/components/base/Modal.vue';
import ModalHeader from '~/components/base/modal/Header.vue';
import ModalBody from '~/components/base/modal/Body.vue';
import ModalFooter from '~/components/base/modal/Footer.vue';
import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';

interface AccountWithType extends Account {
  accountType: AccountType;
}

type actionFormModalType = 'new' | 'edit'

const { data: accountTypes } = await useAsyncData<AccountType[]>('accountTypes', () => $fetch('/api/account/type'))
const { data: accounts } = await useAsyncData<AccountWithType[]>('account', () => $fetch('/api/account'))

const accountModalTarget: string = "accountModal"
const accountDeleteModalTarget: string = "accountDeleteModal"
const accountTypeModalTarget: string = "accountTypeModal"
const accountSelected = ref<AccountWithType | null>(null)
const actionFormModal = ref<actionFormModalType>('new')

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
    accountTypes.value?.push(accountType.value as AccountType)
    hide(accountTypeModalTarget)
    return void 0
  }

  const name = formData.get("name")
  const accountTypeId = formData.get("accountTypeId")
  const initialBalance = formData.get("initialBalance")

  const { data: account } = await useFetch('/api/account', {
    method: 'post',
    body: {
      name,
      accountTypeId,
      initialBalance
    }
  })

  const accountType = accountTypes.value?.find(type => type.id === accountTypeId) as AccountType
  const accountWithType = {
    ...account.value,
    accountType
  } as AccountWithType

  form.reset()
  accounts.value?.push(accountWithType)
  hide(accountModalTarget)
}

const selected = (item: AccountWithType | null) => {
  actionFormModal.value = item === null ? 'new' : 'edit'
  accountSelected.value = item
}
</script>

<template>
  <h1 class="text-gray-300 text-3xl font-bold">
    Contas
  </h1>

  <div class="flex justify-end">
    <Button type="button" color="default" @click="selected(null)" v-show-modal="accountModalTarget">
      Adicionar
    </Button>
  </div>

  <Modal ref="modalElement" :target="accountModalTarget" position="top-center" class="mt-16">
    <ModalHeader :target="accountModalTarget" title="Cadastrar tipo de conta" />
    <form id="account" novalidate @submit.prevent="handleSubmit">
      <ModalBody :hasTitle="true">
        <div class="flex gap-4 items-end">
          <fieldset class="flex-auto">
            <FormInput name="name" label="Nome" :value="accountSelected?.name" />
          </fieldset>

          <fieldset class="flex-auto">
            <FormInput name="initialBalance" label="Valor inicial" :value="accountSelected?.initialBalance" />
          </fieldset>
        </div>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <Select name="accountTypeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in accountTypes" :key="id" :value="id"
                :selected="accountSelected?.accountTypeId === id">
                {{ description }}
              </option>
            </Select>
          </fieldset>

          <Button type="button" color="default" v-show-modal="accountTypeModalTarget">
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

  <base-table v-if="accounts?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <base-table-head class="text-xs text-gray-400 uppercase bg-gray-700">
      <base-table-head-cell>Name</base-table-head-cell>
      <base-table-head-cell><span class="sr-only">actions</span></base-table-head-cell>
    </base-table-head>
    <base-table-body>
      <base-table-body-row v-for="item in accounts" :key="item.name">
        <base-table-body-cell>
          {{ item.name }}
        </base-table-body-cell>
        <base-table-body-cell class="flex justify-end items-center gap-2">
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="accountModalTarget">
            <icons-edit-registtry-icon class="text-blue-600" />
          </Button>
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="accountDeleteModalTarget">
            <icons-remove-registtry-icon class="text-red-500" />
          </Button>
        </base-table-body-cell>
      </base-table-body-row>
    </base-table-body>
  </base-table>
</template>