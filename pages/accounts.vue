<script setup lang="ts">
const modalTarget = 'main-modal'
</script>

<template>
  <main class="p-5 w-full">
    <h1 class="text-gray-300 text-3xl font-bold">
      Contas
    </h1>

    <div class="flex justify-end">
      <button
          class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          v-show-modal="modalTarget"
      >
        Nova conta
      </button>
    </div>
  </main>

  <base-modal ref="modalElement" :target="modalTarget" class="mt-16">
    <template #header>
      <h3 class="text-xl font-medium text-white">
        Nova conta
      </h3>
      <button
          type="button"
          v-hide-modal="modalTarget"
          class="text-sm ml-auto flex items-center hover:text-gray-300 text-gray-50"
      >
        <icons-close class="h-4 w-4" viewBox="0 0 20 20" />
      </button>
    </template>

    <template #body>
      <form id="account-type" novalidate>
        <div class="p-6">

          <div class="flex gap-4 items-end">
            <fieldset class="flex-auto">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-300">
                Nome
              </label>
              <input
                  id="name"
                  class="border rounded w-full p-2.5 text-sm bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  autocomplete="off"
              />
            </fieldset>
            <fieldset class="flex-auto">
              <label for="initialBalance" class="block mb-2 text-sm font-medium text-gray-300">
                Valor inicial
              </label>
              <input
                  id="initialBalance"
                  class="border rounded w-full p-2.5 text-sm bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  autocomplete="off"
              />
            </fieldset>
          </div>
          <div class="mt-6">
            <label for="accountTypeId" class="block mb-2 text-sm font-medium text-gray-300">
              Tipo de conta
            </label>
            <select id="accountTypeId" class="border rounded w-full p-2.5 text-sm bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
              <option selected>Selecione o tipo</option>
            </select>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <button
          class="bg-purple-700 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
          v-hide-modal="modalTarget"
      >
        Confirmar
      </button>
    </template>
  </base-modal>
</template>
