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
        color="red"
        @click="handleActionOptions('63f24db4925a70b803a70ecf')"
        v-show-modal="transactionModalTarget"
      >
        <template #prefix>
          <icons-arrow-trending-down/>
        </template>
        Despesas
      </base-button>

      <base-button
        color="green"
        @click="handleActionOptions('63f24db4925a70b803a70ece')"
        v-show-modal="transactionModalTarget"
      >
        <template #prefix>
          <icons-arrow-trending-up/>
        </template>
        Receitas
      </base-button>
    </div>
  </div>

  <transaction-modal />
</template>

<script setup lang="ts">
import {useCategoryTypeStore} from "~/store/categoryType";

const {selectedItem} = useCategoryTypeStore()

const transactionModalTarget: string = "transactionModal"
const showOptions = ref<boolean>(false)
const optionsContainer = ref<HTMLDivElement>()

const handleActionOptions = (id: string) => selectedItem(id)

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