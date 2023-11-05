<template>
  <table class="w-full text-sm text-left text-gray-400 mt-8" v-bind="useAttrs()">
    <thead class="text-gray-400 uppercase">
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
    <tfoot class="text-gray-400 uppercase">
      <slot name="foot" />
    </tfoot>
  </table>
</template>
