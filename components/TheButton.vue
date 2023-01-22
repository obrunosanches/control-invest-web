<script setup lang="ts">
import { useAttrs } from 'vue';

const baseClass = "text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-blue-800"
const className = useAttrs().class || baseClass
</script>

<template>
  <button :class="className">
    <slot />
  </button>
</template>

