<script setup lang="ts">
import { Account as IAccount, AccountType as IAccountType } from '@prisma/client'

import { hide } from '~/plugins/modal';

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
import EditRegisttryIcon from '~~/components/Icons/EditRegisttryIcon.vue';
import RemoveRegisttryIcon from '~~/components/Icons/RemoveRegisttryIcon.vue';

interface IAccountWithType extends IAccount {
  accountType: IAccountType;
}

type actionFormModalType = 'new' | 'edit'

const { data: accountTypes } = await useAsyncData<IAccountType[]>('accountTypes', () => $fetch('/api/account/type'))
const { data: accounts } = await useAsyncData<IAccountWithType[]>('account', () => $fetch('/api/account'))

const accountModalTarget: string = "accountModal"
const accountDeleteModalTarget: string = "accountDeleteModal"
const accountTypeModalTarget: string = "accountTypeModal"
const accountySelected = ref<IAccountWithType | null>(null)
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

const selected = (item: IAccountWithType | null) => {
  actionFormModal.value = item === null ? 'new' : 'edit'
  accountySelected.value = item
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
            <FormInput name="name" label="Nome" :value="accountySelected?.name" />
          </fieldset>

          <fieldset class="flex-auto">
            <FormInput name="initialBalance" label="Valor inicial" :value="accountySelected?.initialBalance" />
          </fieldset>
        </div>

        <div class="flex mt-6 gap-4 items-end">
          <fieldset class="flex-auto">
            <Select name="accountTypeId" label="Tipo">
              <option selected>Selecione o tipo</option>
              <option v-for="{ id, description } in accountTypes" :key="id" :value="id"
                :selected="accountySelected?.accountTypeId === id">
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

  <BaseTable v-if="accounts?.length" class="w-full text-sm text-left text-gray-400 mt-8" striped>
    <BaseTableHead class="text-xs text-gray-400 uppercase bg-gray-700">
      <BaseTableHeadCell>Name</BaseTableHeadCell>
      <BaseTableHeadCell><span class="sr-only">actions</span></BaseTableHeadCell>
    </BaseTableHead>
    <BaseTableBody>
      <BaseTableRow v-for="item in accounts" :key="item.name">
        <BaseTableCell>
          {{ item.name }}
        </BaseTableCell>
        <BaseTableCell class="flex justify-end items-center gap-2">
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="accountModalTarget">
            <EditRegisttryIcon class="text-blue-600" />
          </Button>
          <Button @click="selected(item)" class="bg-transparent" v-show-modal="accountDeleteModalTarget">
            <RemoveRegisttryIcon class="text-red-500" />
          </Button>
        </BaseTableCell>
      </BaseTableRow>
    </BaseTableBody>
  </BaseTable>
</template>