<template>
  <TableWrapper
    tableTitle="Таблица сотрудников"
    :theader="Object.values(employeesTableHeaders)"
    :tbody="employeesBodyData"
    addBtnText="Добавить сотрудника"
    isPossibleAddItem
    isPossibleDeleteItem
    @addData="handleTogglePopup"
    @deleteData="handleDeleteData"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup">
    <AddForm :data="employeesTableHeaders" @addData="handleAddData"/>
  </PopupWrapper>
  <notifications closeOnClick position="top right" />
</template>

<script setup>
import { ref } from "vue";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import employees from "../../mock-data/employees.json";
import employeesTableHeaders from "../../mock-data/employeesTableHeaders.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";

const { notify } = useNotification();

const employeesBodyData = ref(employees);
const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};

const handleAddData = (data) => {
  employeesBodyData.value = [...employeesBodyData.value, data]
};
const handleDeleteData = (data) => {
  employeesBodyData.value = employeesBodyData.value.filter(
    (el) => el.phone !== data.phone
  );
  notify({
    text: "Сотрудник удалён",
  });
};
</script>
