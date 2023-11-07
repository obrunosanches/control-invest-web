<script setup lang="ts">
const props = defineProps<{
  rotate: 'left' | 'up' | 'right' | 'down'
}>()
</script>

<template>
  <icons-base>
    <path v-if="rotate === 'left'" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    <path v-if="props.rotate === 'up'" stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    <path v-if="props.rotate === 'right'" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    <path v-if="props.rotate === 'down'" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </icons-base>
</template>
