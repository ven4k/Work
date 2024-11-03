<template>
  <TableWrapper
    :theader="Object.values(catalogTableHeader)"
    :tbody="catalogBodyData"
    addBtnText="Добавить запчасть"
    tableTitle="Каталог запчастей"
    isPossibleAddItem
    isPossibleDeleteItem
    @deleteData="handleDeleteData"
    @addData="handleTogglePopup"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup" title="Каталог">
    <AddForm :data="catalogTableHeader" @addData="handleAddData" />
  </PopupWrapper>
</template>

<script setup>
import { ref } from "vue";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import catalog from "../../mock-data/catalog.json";
import catalogTableHeader from "../../mock-data/catalogTableHeader.json";
import { useNotification } from "@kyvg/vue3-notification";
import AddForm from "../AddForm/AddForm.vue";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";

const { notify } = useNotification();

const catalogBodyData = ref(catalog);

const isOpenAddFormPopup = ref(false);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};
const handleAddData = (data) => {
  catalogBodyData.value = [...catalogBodyData.value, data]
};
const handleDeleteData = (data) => {
  catalogBodyData.value = catalogBodyData.value.filter(
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
