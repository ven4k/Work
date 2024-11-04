<template>
  <TableWrapper
    tableTitle="Таблица заявок"
    :theader="Object.values(applicationTableHeader)"
    :tbody="applicationsBodyData"
    isApplication
    :applicationStatusData="statuses"
    addBtnText="Создать заявку"
    :isPossibleAddItem="isAdmin"
    :isPossibleDeleteItem="isAdmin"
    @addData="handleTogglePopup"
    @deleteData="handleDeleteData"
    @updateTableData="handleUpdateTableData"
  />
  <PopupWrapper
    :isOpenPopup="isOpenAddFormPopup"
    @close="handleTogglePopup"
    title="Заявки"
  >
    <CreateApplication
      @close="handleTogglePopup"
      @addData="handleAddData"
      :clients="clientsJSON"
      :employees="employeesJSON"
      :catalog="catalogJSON"
      :workType="workType"
      :status="statuses"
    />
  </PopupWrapper>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import applications from "../../mock-data/applications.json";
import applicationTableHeader from "../../mock-data/applicationsTableHeaders.json";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";
import CreateApplication from "../CreateApplication/CreateApplication.vue";
import clientsJSON from "../../mock-data/clients.json";
import employeesJSON from "../../mock-data/employees.json";
import catalogJSON from "../../mock-data/catalog.json";

defineProps({
  isAdmin: { type: Boolean, default: true }
})

const { notify } = useNotification();
const isOpenAddFormPopup = ref(false);
const applicationsBodyData = ref(applications);

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

const handleTogglePopup = () => {
  isOpenAddFormPopup.value = !isOpenAddFormPopup.value;
};

const handleAddData = (data) => {
  const { client, employee, catalog, comment, status, workType } = data;

  const addCatalogAddicationId = catalog?.split(" ").slice(-1).join(" ");
  const addCatalogName = catalog?.split(" ").slice(0, 3).join(" ");

  const addClientPhone = client?.split(" ").slice(-1).join();
  const addClientFullName = client?.split(" ").slice(0, 3).join(" ");

  const addEmployeFullName = employee?.split(" ").slice(0, 3).join(" ");

  const catalogData = catalogJSON.find(
    (el) => el.catalogAddication_id == addCatalogAddicationId
  );
  const clientData = clientsJSON.find((el) => el.phone == addClientPhone);

  const addData = {
    application_id: Date.now().toString().slice(-6),
    fullname: addClientFullName,
    phone: clientData.phone,
    email: clientData.email,
    post: clientData.post,
    catalog_id: catalogData.catalog_id,
    addication_id: addCatalogAddicationId,
    work_type: workType,
    tariff_name: addCatalogName,
    emploeyee: addEmployeFullName,
    status: status,
    comment: comment || "-",
  };
  console.log("addData", addData);

  applicationsBodyData.value = [...applicationsBodyData.value, addData];
  notify({
    duration: 3000,
    type: 'success',
    title: 'Заявка создана'
  })
};
const handleDeleteData = (data) => {
  applicationsBodyData.value = applicationsBodyData.value.filter(
    (el) => el.phone !== data.phone
  );
  notify({
    text: "Заявка удалена",
    type: "warn",
    duration: 3000,
  });
};

const handleUpdateTableData = (status, applicationId) => {
  const targetTableRow = applicationsBodyData.value.find(el => el.application_id === applicationId)
  if (targetTableRow) {
    targetTableRow.status = status;
  } 
}
onMounted(() => {
  const localStorageApplications = localStorage.getItem('applications')
  const parsedLocalStorageApplications = JSON.parse(localStorageApplications)
  if (localStorageApplications) {
    applicationsBodyData.value = parsedLocalStorageApplications
  }
})
onUnmounted(() => {
  localStorage.setItem('applications', JSON.stringify(applicationsBodyData.value))
})
</script>

<style lang="scss"></style>
