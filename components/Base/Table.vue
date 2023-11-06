<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <table class="w-full text-sm text-gray-400" v-bind="useAttrs()">
    <thead
      v-if="slots.head"
      class="uppercase text-gray-300 text-xs font-bold"
    >
      <slot name="head" />
    </thead>

    <tbody>
      <slot name="body" />
    </tbody>

    <tfoot
      v-if="slots.foot"
      class="text-gray-400 uppercase"
    >
      <slot name="foot" />
    </tfoot>
  </table>
</template>
