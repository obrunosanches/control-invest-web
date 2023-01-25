<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CategoryType as ICategoryType } from "@prisma/client";

import FormInput from '~/components/Form/FormInput.vue';
import Select from '~/components/Form/FormSelect.vue';
import Button from '~/components/TheButton.vue';

const categoryTypes: any = ref<ICategoryType[]>([])

onMounted(async () => {
  const { data } = await useFetch<ICategoryType[]>('/api/category/type')
  categoryTypes.value = data.value
})

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  await useFetch('/api/category', {
    method: 'post',
    body: {
      name: formData.get("name"),
      typeId: formData.get("typeId"),
    }
  })

  form.reset()
}
</script>

<template>
  <h2 class="text-2xl">Cadastrar nova categoria</h2>

  <div class="max-w-xl m-auto mt-8 p-6 rounded-lg shadow bg-gray-800 border-gray-700">
    <form novalidate @submit.prevent="handleSubmit">
      <fieldset>
        <FormInput name="name" label="Descrição" />
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

        <NuxtLink to="type/new">
          <Button type="button" color="default">
            Tipo
          </Button>
        </NuxtLink>
      </div>

      <fieldset class="mt-6 text-end">
        <Button type="submit" color="default">
          Salvar
        </Button>
      </fieldset>
    </form>
  </div>
</template>