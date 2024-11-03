<template>
  <div style="display: flex; gap: 30px">
    <div
      v-for="(item, index) in cards"
      class="mainMenu__card"
      :key="index"
      style="border: 2px solid black; padding: 60px 40px"
      @click="handleClickCard(index)"
    >
      <div>{{ item.cardName }}</div>
      <div style="font-size: 10px">{{ item.description }}</div>
    </div>
    <div class="exitBtn" @click="handleClickExit">Выход</div>
    <ModalWrapper :isOpenModal="isOpenModal" @closeModal="handleCloseModal">
      <template v-slot:default>
        <component :is="cards[choosedCard].component" />
      </template>
    </ModalWrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Clients from "../Clients/Clients.vue";
import Employees from "../Employees/Employees.vue";
import ModalWrapper from "../ModalWrapper/ModalWrapper.vue";
import Catalog from "../Catalog/Catalog.vue";
import ApplicationForm from "../ApplicationForm/ApplicationForm.vue";

const router = useRouter();

const cards = [
  {
    cardName: "Каталог",
    description: "Каталог запчастей",
    component: Catalog,
  },
  {
    cardName: "Клиенты",
    description: "Учет клиентов",
    component: Clients,
  },
  {
    cardName: "Сотрудники",
    description: "Учет работников",
    component: Employees,
  },
  {
    cardName: "Заявки",
    description: "Заявки на работы",
    component: ApplicationForm,
  },
];

const isOpenModal = ref(false);
const choosedCard = ref(null);

const handleClickCard = (index) => {
  choosedCard.value = index;
  isOpenModal.value = true;
};
const handleCloseModal = () => {
  isOpenModal.value = false;
};

const handleClickExit = () => {
  localStorage.clear();
  router.push("/");
};
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
