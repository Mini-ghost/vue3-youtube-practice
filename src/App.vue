<template>
  <Default>
    <router-view />
  </Default>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="scss">
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.line-clamp-2 {
  @apply truncate;
  display: -webkit-box;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.filter-blur-3 {
  backdrop-filter: blur(12px)
}
</style>
