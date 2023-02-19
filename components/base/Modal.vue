<script setup lang='ts'>
import { PropType } from 'vue';
import classNames from 'classnames';

import { ModalPosition, ModalSize } from '~/components/base/modal/types'
import { modalSizeClasses } from '~/components/base/modal/utils'

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
  <base-modal-container :position="props.position" :target="props.target">
    <div class="relative p-4 w-full h-full md:h-auto" :class="modalClassName">
      <div class="relative rounded-lg shadow dark:bg-gray-700">
        <slot />
      </div>
    </div>
  </base-modal-container>
</template>
