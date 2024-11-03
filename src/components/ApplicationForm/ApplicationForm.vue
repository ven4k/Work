<template>
  <TableWrapper
    tableTitle="Таблица заявок"
    :theader="Object.values(applicationTableHeader)"
    :tbody="applicationsBodyData"
    addBtnText="Создать заявку"
    isPossibleAddItem
    isPossibleDeleteItem
    @addData="handleTogglePopup"
    @deleteData="handleDeleteData"
  />
  <PopupWrapper :isOpenPopup="isOpenAddFormPopup" @close="handleTogglePopup" title="Заявки">
    <CreateApplication @close="handleTogglePopup" @addData="handleAddData"/>
  </PopupWrapper>
</template>

<script setup>
import { ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import applications from "../../mock-data/applications.json";
import applicationTableHeader from "../../mock-data/applicationsTableHeaders.json";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";
import CreateApplication from "../CreateApplication/CreateApplication.vue";

const { notify } = useNotification();
const isOpenAddFormPopup = ref(false);
const applicationsBodyData = ref(applications);

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};

const handleAddData = (data) => {
  console.log(data)
  // applicationsBodyData.value = [...applicationsBodyData.value, data]
  // notify({
  //   duration: 3000,
  //   type: 'success',
  //   title: 'Заявка создана'
  // })
};
const handleDeleteData = (data) => {
  applicationsBodyData.value = applicationsBodyData.value.filter(
    (el) => el.phone !== data.phone
  );
  notify({
    text: "Заявка удалена",
    type: 'warn',
    duration: 3000,
  });
};
</script>

<style lang="scss"></style>
