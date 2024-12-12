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
import { ref, computed } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import TableWrapper from "../TableWrapper/TableWrapper.vue";
import applicationTableHeader from "../../mock-data/applicationsTableHeaders.json";
import PopupWrapper from "../PopupWrapper/PopupWrapper.vue";
import CreateApplication from "../CreateApplication/CreateApplication.vue";

import { useStore } from "vuex";

const store = useStore()

const clientsJSON = computed(() => store.state.clients)
const employeesJSON = computed(() => store.state.employees)
const catalogJSON = computed(() => store.state.catalog)
const applications = computed(() => store.state.applications)

defineProps({
  isAdmin: { type: Boolean, default: true }
})

const { notify } = useNotification();
const isOpenAddFormPopup = ref(false);
const applicationsBodyData = ref(applications.value);

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

  const catalogData = catalogJSON.value.find(
    (el) => el.catalogAddication_id == addCatalogAddicationId
  );
  const clientData = clientsJSON.value.find((el) => el.phone == addClientPhone);

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

  applicationsBodyData.value = [...applicationsBodyData.value, addData];
  store.commit('updateApplications', applicationsBodyData.value)
  sessionStorage.setItem('applications', JSON.stringify(applicationsBodyData.value))
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
  store.commit('updateApplications', applicationsBodyData.value)
  sessionStorage.setItem('applications', JSON.stringify(applicationsBodyData.value))
};

const handleUpdateTableData = (status, applicationId) => {
  applicationsBodyData.value = applicationsBodyData.value.map(el => {
    if (el.application_id === applicationId) {
      return { ...el, status };
    }
    return el;
  });
  store.commit('updateApplications', applicationsBodyData.value)
  sessionStorage.setItem('applications', JSON.stringify(applicationsBodyData.value))
};

</script>

<style lang="scss"></style>
