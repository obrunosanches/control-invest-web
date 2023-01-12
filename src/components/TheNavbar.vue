<script setup lang='ts'>
import { computed } from 'vue';
import classNames from 'classnames'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  sticky: {
    type: Boolean,
    default: false
  }
})

const navbarBaseClasses = 'px-2 sm:px-4 py-2.5 dark:bg-gray-900'
const navbarFloatClasses = 'fixed w-full top-0 left-0 border-b border-gray-700'
const navbarClasses = computed(() => {
  return classNames(
    navbarBaseClasses,
    props.className,
    props.sticky && navbarFloatClasses
  )
})
</script>

<template>
  <nav :class="navbarClasses">
    <div class="container flex flex-wrap items-center">
      <slot></slot>
    </div>
  </nav>
</template>
