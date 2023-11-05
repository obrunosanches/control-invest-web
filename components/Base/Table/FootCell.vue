<script setup lang="ts">
const baseClassesFootCell = 'px-6 py-4 last:text-right'
</script>

<template>
  <td :class="baseClassesFootCell">
    <slot />
  </td>
</template>
