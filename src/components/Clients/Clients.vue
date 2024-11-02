<template>
  <TableWrapper
    :theader="Object.values(clientsTableHeaders)"
    :tbody="clientsBodyData"
    tableTitle="Таблица клиентов"
    addBtnText="Добавить клиента"
    isPossibleAddItem
    isPossibleDeleteItem
    @addData="handleTogglePopup"
    @deleteData="handleDeleteData"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup">
    <AddForm :data="clientsTableHeaders" @addData="handleAddData" />
  </PopupWrapper>
</template>

<script setup>
import { ref } from "vue";
import clients from "../../mock-data/clients.json";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import clientsTableHeaders from "../../mock-data/clientsTableHeaders.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";

const { notify } = useNotification();

const clientsBodyData = ref(clients);
const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};
const handleAddData = (data) => {
  clientsBodyData.value = [...clientsBodyData.value, data]
};
const handleDeleteData = (data) => {
  clientsBodyData.value = clientsBodyData.value.filter(
    (el) => el.phone !== data.phone
  );
  notify({
    text: "Клиент удалён",
  });
};
</script>

<style lang="scss" scoped>
.clients__content {
  margin: 0 0 20px 0;
}
</style>
