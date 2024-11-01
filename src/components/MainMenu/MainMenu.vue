<template>
  <div style="display: flex; gap: 30px;">
    <div v-for="(item, index) in cards" class="mainMenu__card" :key="index" style="border: 2px solid black; padding: 60px 40px;"  @click.stop.prevent="handleClickCard(index)">
      <div>{{ item.cardName }}</div>
      <div style="font-size: 10px;">{{ item.description }}</div>
      <ModalWrapper :isOpenModal="isOpenModal[index]" @closeModal="handleCloseModal(index)">
        <template v-slot:default>
          <component :is="item.component"/>
        </template>
      </ModalWrapper>
    </div>
    <div class="exitBtn" @click="handleClickExit">Выход</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Clients from '../Clients/Clients.vue';
import Employees from '../Employees/Employees.vue';
import ModalWrapper from '../ModalWrapper/ModalWrapper.vue';
import Tariffs from '../Tariffs/Tariffs.vue';

const router = useRouter()

const cards = [
  { cardName: 'Услуги', description: 'Услуги и абоненты', component: Tariffs },
  { cardName: 'Клиенты', description: 'Учет клиентов', component: Clients },
  { cardName: 'Сотрудники', description: 'Учет работников', component: Employees },
]

const isOpenModal = ref(Array(cards.length).fill(false))
const handleClickCard = (index) => {
  isOpenModal.value[index] = true
}
const handleCloseModal = (index) => {
  isOpenModal.value[index] = false
}

const handleClickExit = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.mainMenu__card:hover {
  background-color: azure;
  cursor: pointer;
}
.exitBtn {
  position: absolute;
  border-radius: 6px;
  padding: 6px 8px;
  border: 1px solid red;
  top: 8px;
  right: 8px;
}
</style>