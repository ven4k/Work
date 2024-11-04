<template>
  <TableWrapper
    tableTitle="Таблица сотрудников"
    :theader="Object.values(employeesTableHeaders)"
    :tbody="employeesBodyData"
    addBtnText="Добавить сотрудника"
    :isPossibleAddItem="isAdmin"
    :isPossibleDeleteItem="isAdmin"
    @addData="handleTogglePopup"
    @deleteData="handleDeleteData"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup" title="Сотрудники">
    <AddForm :data="employeesTableHeaders" @addData="handleAddData"/>
  </PopupWrapper>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import employees from "../../mock-data/employees.json";
import employeesTableHeaders from "../../mock-data/employeesTableHeaders.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";

defineProps({
  isAdmin: { type: Boolean, default: true }
})

const { notify } = useNotification();

const employeesBodyData = ref(employees);
const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};

const handleAddData = (data) => {
  employeesBodyData.value = [...employeesBodyData.value, data]
  notify({
    duration: 3000,
    type: 'success',
    title: 'Сотрудник добавлен'
  })
};
const handleDeleteData = (data) => {
  employeesBodyData.value = employeesBodyData.value.filter(
    (el) => el.phone !== data.phone
  );
  notify({
    text: "Сотрудник удалён",
    type: 'warn',
    duration: 3000,
  });
};
onMounted(() => {
  const localStorageEmployees = localStorage.getItem('employees')
  const parsedLocalStorageEmployees = JSON.parse(localStorageEmployees)
  if (localStorageEmployees) {
    employeesBodyData.value = parsedLocalStorageEmployees
  }
})
onUnmounted(() => {
  localStorage.setItem('employees', JSON.stringify(employeesBodyData.value))
})
</script>
