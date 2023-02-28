<template>
  <div class="flex justify-center mb-5 relative">
    <base-button color="purple" class="flex" @click="handleShowOptions">
      <template #prefix>
        <icons-plus-icon />
      </template>
      Novo
    </base-button>

    <div
      v-if="showOptions"
      ref="optionsContainer"
      class="flex flex-col gap-3 bg-gray-200 rounded-md absolute left-0 top-0 min-w-full p-5 -mt-2.5"
    >
      <base-button
        v-for="{ id, description } in categoryTypes"
        :key="id"
        :color="description.toLowerCase() === 'despesas' ? 'red' : 'green'"
        v-show-modal="transactionModalTarget"
        @click="handleActionOptions(id)"
      >
        <template #prefix>
          <icons-arrow-trending-down v-if="description.toLowerCase() === 'despesas'" />
          <icons-arrow-trending-up v-if="description.toLowerCase() === 'receitas'" />
        </template>

        {{ description }}
      </base-button>
    </div>
  </div>

  <transaction-modal />
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCategoryTypeStore} from "~/store/categoryType";

const {getCategoryTypeById} = useCategoryTypeStore()
const categoryTypeStore = useCategoryTypeStore()

const {categoryTypes} = storeToRefs(categoryTypeStore)

const transactionModalTarget: string = "transactionModal"
const showOptions = ref<boolean>(false)
const optionsContainer = ref<HTMLDivElement>()

const handleActionOptions = (id: string) => getCategoryTypeById(id)

const toggleOptions = (event: Event) => {
  const target = event.target as HTMLElement

  if (showOptions.value && optionsContainer.value !== target) {
    showOptions.value = false

    return
  }

  showOptions.value = true
}

const handleShowOptions = (event: Event) => {
  document.addEventListener('click', toggleOptions)
  document.addEventListener('keydown', {
    handleEvent: function (event: KeyboardEvent) {
      if (event.key === "Escape") {
        showOptions.value = false
        document.removeEventListener(event.type, this, false);
      }
    }
  }, false);
}

watch(showOptions, (opened) => !opened && document.removeEventListener('click', toggleOptions))
</script>