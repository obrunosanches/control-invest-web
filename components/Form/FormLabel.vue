<template>
  <label class="block mb-2 text-sm font-medium dark:text-gray-300" v-if="$attrs.for">
    <slot />
  </label>
</template>