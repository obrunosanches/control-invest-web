<script setup lang="ts">
const props = defineProps<{
  rotate: 'left' | 'up' | 'right' | 'down'
}>()
</script>

<template>
  <icons-base
    class="text-gray-50 hover:text-gray-300"
    :viewBox="['left', 'right'].includes(props.rotate ?? 'left') ? '0 0 8 14' : '0 0 14 8'"
    v-bind="useAttrs()"
  >
    <path v-if="rotate === 'left'" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
    <path v-if="props.rotate === 'up'" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
    <path v-if="props.rotate === 'right'" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
    <path v-if="props.rotate === 'down'" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
  </icons-base>
</template>
