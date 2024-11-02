<template>
  <TableWrapper
    :theader="Object.values(tariffsTableHeaders)"
    :tbody="tariffsBodyData"
    addBtnText="Добавить тариф"
    tableTitle="Таблица тарифов"
    isPossibleAddItem
    isPossibleDeleteItem
    @deleteData="handleDeleteData"
    @addData="handleTogglePopup"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup">
    <AddForm :data="tariffsTableHeaders" @addData="handleAddData" />
  </PopupWrapper>
</template>

<script setup>
import { ref } from "vue";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import tariffs from "../../mock-data/tariffs.json";
import tariffsTableHeaders from "../../mock-data/tariffsTableHeaders.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";

const { notify } = useNotification();

const tariffsBodyData = ref(tariffs);

const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};
const handleAddData = (data) => {
  tariffsBodyData.value = [...tariffsBodyData.value, data]
};
const handleDeleteData = (data) => {
  tariffsBodyData.value = tariffsBodyData.value.filter(
    (el) => el.tariffId !== data.tariffId
  );
};
</script>

<style lang="scss" scoped>
.tarif__wrapper {
  display: flex;
}
.tarif__title {
  font-weight: 700;
}
.tarif__content {
  margin: 0 0 10px 0;
}
</style>
