<template>
  <div>
    <div v-for="element in selectData">
      <h4>{{ element.label }}</h4>
      <select v-model="formValues[element.dataName]">
        <option value="">Не выбрано</option>
        <option v-for="item in element.data" :value="item.name">
          {{ item }}
        </option>
      </select>
    </div>
    <textarea v-model="formValues.comment"> </textarea>
    <button @click="handleCreateData">Создать</button>
    {{ formValues }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import catalog from "../../mock-data/catalog.json";
import clients from "../../mock-data/clients.json";
import employees from "../../mock-data/employees.json";

const emit = defineEmits(["close", "addData"]);
const clientsData = ref(
  clients.map((item) => {
    return `${item.lastName} ${item.firstName} ${item.patronymic} ${item.phone}`
  })
);
const employeesData = ref(
  employees.map((item) => {
    return `${item.lastName} ${item.firstName} ${item.patronymic} ${item.phone}`;
  })
);
const catalogData = ref(
  catalog.map((item) => {
    return `${item.name} ${item.color} ${item.catalogAddication_id}`
  })
);
const workType = ref([
  'Работа1',
  'Работа2',
  'Работа3',
  'Работа4'
])
const statuses = ref([
  'Статус1',
  'Статус2',
  'Статус3',
  'Статус4'
])
const selectData = [
  {
    label: "Клиенты",
    dataName: "clients",
    data: clientsData.value,
  },
  {
    label: "Сотрудники",
    dataName: "employees",
    data: employeesData.value,
  },
  {
    label: "Каталог",
    dataName: "catalog",
    data: catalogData.value,
  },
  {
    label: "Типы работ",
    dataName: "workType",
    data: workType.value,
  },
  {
    label: "Статус",
    dataName: "status",
    data: statuses.value,
  }
];

const formValues = ref({
  clients: "",
  employees: "",
  catalog: "",
  workType: "",
  status: "",
  comment: "",
});

const handleCreateData = () => {
  emit("addData", formValues.value);
  emit("close");
};
</script>

<style lang="scss" scoped></style>
