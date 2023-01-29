<script setup lang='ts'>
import CloseIcon from '~/components/Icons/CloseIcon.vue'

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
  title: {
    type: String
  }
})
</script>

<template>
  <div class="flex items-center justify-between rounded-t p-5 border-b dark:border-gray-600" aria-labelledby="modal-title">
    <h3 :v-if="props.title" class="text-xl font-medium dark:text-white">
      {{ props.title }}
    </h3>
    <button type="button" v-modal-hide="props.target"
      class="text-sm ml-auto flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <slot>
        <CloseIcon class="h-4 w-4" viewBox="0 0 20 20" />
      </slot>
    </button>
  </div>
</template>
