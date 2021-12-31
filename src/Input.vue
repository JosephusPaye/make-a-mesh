<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

const color = ref(props.modelValue);

watch(color, (newColor) => {
  emit('update:modelValue', newColor);
});
</script>

<template>
  <input
    :type="props.type"
    :placeholder="props.placeholder"
    :title="props.placeholder"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="
      relative
      border
      first:rounded-l
      last:rounded-r
      border-r-0
      last:border-r
      text-base
      px-4
      py-2
      leading-none
      w-full
      text-white
      border-gray-800
      bg-[rgba(0,0,0,0.15)]
      hover:border-gray-700
      focus:z-10 focus:outline-none focus:shadow-[0px_0px_0px_3px_#4fc3f7]
    "
  />
</template>
