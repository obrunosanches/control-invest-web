<script setup lang='ts'>
import { computed } from 'vue';
import classNames from 'classnames';

import Navbar from './Navbar.vue';

const props = defineProps({
  className: {
    type: String,
    default: false
  }
})

const layoutClasses = computed(() => {
  return classNames(
    props.className
  )
})
</script>

<template>
  <div :class="layoutClasses">
    <Navbar sticky>
      <div class="flex">
        <img src="../assets/logo.svg" class="h-6 mr-3 sm:h-9" alt="Control Money Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Control Money</span>
      </div>
    </Navbar>

    <main class="w-full pt-14 text-white">
      <slot />
    </main>
  </div>
</template>