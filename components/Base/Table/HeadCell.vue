<script setup lang="ts">
const baseClassesHeadCell = 'px-6 py-4 text-xs uppercase border-b border-white/[.15]'
</script>

<template>
  <th :class="baseClassesHeadCell">
    <slot />
  </th>
</template>
