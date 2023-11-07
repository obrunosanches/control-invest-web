<script setup lang="ts">
import classNames from "classnames"

import type { PropType } from "@vue/runtime-core"

type ModalPosition = 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right';
type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

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
  title: {
    type: String,
    required: false,
    default: ''
  },
})

const modalSizeClasses = {
  'xs': 'max-w-xs',
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

const modalPositionClasses = {
  'top-left': 'justify-start items-start',
  'top-center': 'justify-center items-start',
  'top-right': 'justify-end items-start',
  'center-left': 'justify-start items-center',
  'center': 'justify-center items-center',
  'center-right': 'justify-end items-center',
  'bottom-left': 'justify-start items-end',
  'bottom-center': 'justify-center items-end',
  'bottom-right': 'justify-end items-end',
}

const modalClassName = computed(() => classNames(modalSizeClasses[props.size] ?? modalSizeClasses[props.size]))
const containerModalClasseName = computed(() => modalPositionClasses[props.position])
</script>

<template>
  <div
    :id="props.target"
    class="fixed top-0 left-0 right-0 z-50 hidden"
    aria-modal="true"
  >
    <div class="bg-gray-900 dark:bg-opacity-80 fixed inset-0 z-40" />
    <div
      tabindex="-1"
      role="dialog"
      class="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 md:h-full flex"
      :class="containerModalClasseName"
    >
      <div class="relative p-4 w-full h-full md:h-auto" :class="modalClassName">
        <div class="relative rounded-lg shadow dark:bg-gray-700">
          <header
            class="flex items-center justify-between border-b dark:border-gray-600 rounded-t p-5"
            aria-labelledby="modal-title"
            v-if="props.title"
          >
            <h3 class="text-xl font-medium text-white">
              {{ props.title }}
            </h3>

            <form-kit
              type="button"
              v-close-modal="props.target"
              input-class="text-sm ml-auto flex items-center hover:text-gray-300 text-gray-50"
            >
              <icons-close class="w-[20px] h-[20px] hover:text-gray-400" stroke-width="2.5" />
            </form-kit>
          </header>

          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
[data-invalid] .formkit-messages {
  color: rgb(220 38 38);
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
}
</style>
