<script setup lang='ts'>
import { PropType } from 'vue';

import { ModalPosition } from './types'
import { modalPositionClasses } from './utils'

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<ModalPosition>,
    default: 'center',
  }
})

const containerModalClasseName = computed(() => modalPositionClasses[props.position] ?? modalPositionClasses[props.position])
</script>

<template>
  <div :id="props.target" class="fixed top-0 left-0 right-0 z-50 hidden" aria-modal="true">
    <div class="bg-gray-900 dark:bg-opacity-80 fixed inset-0 z-40" />
    <div tabindex="-1" role="dialog" class="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 md:h-full flex"
      :class="containerModalClasseName">
      <slot />
    </div>
  </div>
</template>
