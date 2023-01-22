<template>
  <li>
    <router-link :to="String(useAttrs().to)" class="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </router-link>
  </li>
</template>
