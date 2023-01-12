<script setup lang='ts'>
const props = defineProps({
  href: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li>
    <a :href="props.href" class="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </a>
  </li>
</template>
