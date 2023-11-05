<template>
  <table v-bind="useAttrs()">
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
