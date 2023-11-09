<script setup lang="ts">
const slots = useSlots()
</script>

<template>
  <table class="w-full text-sm" v-bind="useAttrs()">
    <thead
      v-if="slots.head"
      class="uppercase text-xs font-bold border-b border-black/10"
    >
      <slot name="head" />
    </thead>

    <tbody>
      <slot name="body" />
    </tbody>

    <tfoot v-if="slots.foot" class="uppercase border-t border-black/10">
      <slot name="foot" />
    </tfoot>
  </table>
</template>
