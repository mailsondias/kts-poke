<script lang="ts" setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['search']);
const inputRef = ref<any>('');

const handleInput = (event: Event) => {
  emit('search', (event.target as HTMLInputElement).value);
};

const handleCleanField = () => {
  inputRef.value.value = ''
  emit('search', '');
}
</script>

<template>
  <div class="field-input">
    <input
      ref="inputRef"
      type="text"
      placeholder="Pesquise por nome"
      @input="handleInput"
    />
    <button @click="handleCleanField">
      Limpar
    </button>
  </div>
</template>

<style lang="scss" scoped>
.field-input {
  @apply py-3 px-8 bg-white text-[#C1BEBE] text-sm w-full flex border rounded-full justify-between;

  input {
    @apply border-none w-11/12 outline-none;
  }
}
</style>
