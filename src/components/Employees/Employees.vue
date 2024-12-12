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
import { ref, onMounted } from "vue";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import employeesTableHeaders from "../../mock-data/employeesTableHeaders.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";
import { useStore } from "vuex";

defineProps({
  isAdmin: { type: Boolean, default: true }
})
const store = useStore()
const { notify } = useNotification();

const employeesBodyData = ref([]);
const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};

const handleAddData = (data) => {
  employeesBodyData.value = [...employeesBodyData.value, data]
  store.commit('updateEmployees', employeesBodyData.value)
  sessionStorage.setItem('employees', JSON.stringify(employeesBodyData.value))
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
  store.commit('updateEmployees', employeesBodyData.value)
  sessionStorage.setItem('employees', JSON.stringify(employeesBodyData.value))
  notify({
    text: "Сотрудник удалён",
    type: 'warn',
    duration: 3000,
  });
};
onMounted(() => {
  employeesBodyData.value = store.state.employees
})

</script>
