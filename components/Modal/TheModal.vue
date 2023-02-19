<script setup lang='ts'>
import { PropType } from 'vue';
import classNames from 'classnames';

import { ModalPosition, ModalSize } from './types'
import { modalSizeClasses } from './utils'

import ModalContainer from '~/components/Modal/TheModalContainer.vue'

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<ModalPosition>,
    default: 'center',
  },
  size: {
    type: String as PropType<ModalSize>,
    default: '2xl',
  },
})

const modalClassName = computed(() => classNames(modalSizeClasses[props.size] ?? modalSizeClasses[props.size]))
</script>

<template>
  <ModalContainer :position="props.position" :target="props.target">
    <div class="relative p-4 w-full h-full md:h-auto" :class="modalClassName">
      <div class="relative rounded-lg shadow dark:bg-gray-700">
        <slot />
      </div>
    </div>
  </ModalContainer>
</template>
