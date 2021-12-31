<script setup>
const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="
      rounded
      font-semibold
      px-4
      h-10
      leading-none
      py-2
      select-none
      inline-flex
      items-center
      justify-center
      text-white
      bg-gray-800
      hover:bg-gray-700
      disabled:opacity-60
    "
    @click="emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
