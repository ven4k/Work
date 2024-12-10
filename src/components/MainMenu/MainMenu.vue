<template>
  <div style="display: flex; gap: 30px">
    <div
      v-for="(item, index) in cards"
      class="mainMenu__card"
      :key="index"
      @click="handleClickCard(index)"
    >
      <img :src="getImageUrl(item.img)" alt="" />
      <div>{{ item.cardName }}</div>
      <div style="font-size: 10px">{{ item.description }}</div>
    </div>
    <div class="role">{{ role }}</div>
    <div class="exitBtn" @click="handleClickExit">Выход</div>
    <ModalWrapper :isOpenModal="isOpenModal" @closeModal="handleCloseModal">
      <template v-slot:default>
        <component :is="cards[choosedCard].component" :isAdmin="isAdmin" />
      </template>
    </ModalWrapper>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Clients from "../Clients/Clients.vue";
import Employees from "../Employees/Employees.vue";
import ModalWrapper from "../ModalWrapper/ModalWrapper.vue";
import Catalog from "../Catalog/Catalog.vue";
import ApplicationForm from "../ApplicationForm/ApplicationForm.vue";

const router = useRouter();
const isAdmin = ref(true);
const role = ref('')

const cards = ref([
  {
    cardName: "Каталог",
    description: "Каталог запчастей",
    component: Catalog,
    img: "catalog.svg",
  },
  {
    cardName: "Сотрудники",
    description: "Учет работников",
    component: Employees,
    img: "workers.svg",
  },
  {
    cardName: "Заявки",
    description: "Заявки на работы",
    component: ApplicationForm,
    img: "applications.svg",
  },
]);
onMounted(() => {
  if (sessionStorage.getItem("isLogged")) {
    isAdmin.value = true;
    role.value = 'Admin'
    cards.value.push({
      cardName: "Клиенты",
      description: "Учет клиентов",
      component: Clients,
      img: "clients.svg",
    });
  } else {
    role.value = 'Master'
    isAdmin.value = false;
  }
});
const getImageUrl = (img) => {
  return new URL(`../../assets/${img}`, import.meta.url).href;
};
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
  sessionStorage.removeItem("isLogged");
  sessionStorage.removeItem("isLoggedMaster");

  router.push("/");
};
</script>

<style lang="scss" scoped>
.mainMenu__card {
  background-color: #fff;
  border: 2px solid #009879;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 160px;
  padding: 60px 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  & > div:first-child {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  & > div:last-child {
    font-size: 10px;
    color: #555;
  }
}

.exitBtn {
  position: absolute;
  background-color: #009879;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  top: 8px;
  right: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #017f66;
  }
}
.role {
  position: absolute; 
  top: 18px;
  right: 60px;
  width: 100px;
}
</style>
