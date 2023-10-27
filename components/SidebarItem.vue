<script setup lang="ts">
const props = defineProps({
  route: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li>
    <router-link
      :to="props.route"
      class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
    >
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </router-link>
  </li>
</template>
