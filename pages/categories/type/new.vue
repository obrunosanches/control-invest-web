<script setup lang="ts">
import FormInput from '~/components/Form/FormInput.vue';
import Button from '~/components/TheButton.vue';

const handleSubmit = async (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const description = formData.get("description")

  await useFetch('/api/category/type', {
    method: 'post',
    body: {
      description,
    }
  })

  form.reset()
  await navigateTo('/categories/type')
}
</script>

<template>
  <h2 class="text-2xl">Cadastrar novo tipo de categoria</h2>

  <div class="max-w-xl m-auto mt-8 p-6 rounded-lg shadow bg-gray-800 border-gray-700">
    <form novalidate @submit.prevent="handleSubmit">
      <fieldset>
        <FormInput name="description" label="Descrição" />
      </fieldset>

      <fieldset class="mt-6 text-end">
        <Button type="submit" color="default">
          Salvar
        </Button>
      </fieldset>
    </form>
  </div>
</template>