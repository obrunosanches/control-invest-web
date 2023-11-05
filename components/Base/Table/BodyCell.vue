<script setup lang="ts">
const baseClassesBodyCell = 'px-6 py-6 last:text-right border-b border-white/[.15]'
</script>

<template>
  <td :class="baseClassesBodyCell">
    <slot />
  </td>
</template>
