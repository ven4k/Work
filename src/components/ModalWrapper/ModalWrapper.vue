<template>
  <div class="modal__wrapper" v-if="isOpenModal" @click.stop="$emit('closeModal')" @keydown.esc="closeByEsc" tabindex="0" ref="modalElement">
    <div class="modal__contentWrapper"@click.stop>
      <div class="modal__content" >
        <slot></slot>
      </div>
      <button class="modal__close" @click.stop="$emit('closeModal')">X</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';

const modalElement = ref();
const props = defineProps({
  isOpenModal: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits([
  'closeModal'
])
const closeByEsc = (e) => {
  e.stopPropagation();
  modalElement.value?.focus()
  emit('closeModal')
}
watch(() => props.isOpenModal, (newValue) => {
  nextTick(() => {
    if (newValue) {
      modalElement.value?.focus();
    }
  });
});
</script>

<style lang="scss" scoped>
.modal__wrapper {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__contentWrapper {
  position: relative;
}

.modal__content {
  background-color: #fff;
  padding: 20px;
  border: 6px;
  max-width: 1200px;
  max-height: 800px;
  border-radius: 8px;
  overflow-y: auto;
}
.modal__close {
  position: absolute;
  top: 6px;
  right: 18px; 
  background-color: lightblue;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
}
.modal__close::before {
  content: '';
  position: sticky;
  background-color: red;
  width: 100%;
  height: 100%;
}
.modal__close:hover{
  background-color: coral;
}
</style>