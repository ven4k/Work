<template>
  <div>
    <div class="tableWrapper">
      <h2>{{ tableTitle }}</h2>
      <table class="table">
        <thead>
          <tr>
            <th v-for="(header, index) in theader" :key="index">
              {{ header }}
            </th>
            <th v-if="isPossibleDeleteItem"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in tbody" :key="rowIndex">
            <td v-for="(key, cellIndex) in Object.keys(row)" :key="cellIndex">
              <span v-if="!isApplication">
                {{ row[key] ? row[key] : "-" }}
              </span>
              <span v-if="key !== 'status' && isApplication">
                {{ row[key] ? row[key] : "-" }}
              </span>
              <select v-if="key === 'status' && isApplication" @change="handleUpdateTableData($event, row.application_id)">
                <option value="">Не выбрано</option>
                <option
                  :selected="item === row.status"
                  v-for="item in applicationStatusData"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </td>
            <td v-if="isPossibleDeleteItem" @click="$emit('deleteData', row)">
              X
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MainButton
      v-if="isPossibleAddItem"
      @click="$emit('addData')"
      class="tableAddBtn"
      >{{ addBtnText }}</MainButton
    >
  </div>
</template>

<script setup>
import MainButton from "../Buttons/MainButton/MainButton.vue";

defineProps({
  tableTitle: { type: String, default: "" },
  theader: { type: Array, default: () => [] },
  tbody: { type: Array, default: () => [] },
  isPossibleAddItem: { type: Boolean, default: () => [] },
  isPossibleDeleteItem: { type: Boolean, default: false },
  addBtnText: { type: String, default: "" },
  isApplication: { type: Boolean, default: false },
  applicationStatusData: { type: Array, default: () => [] },
});
const emit = defineEmits(["addData", "deleteData", "updateTableData"]);
const handleUpdateTableData = (status, applicationId) => {
  emit("updateTableData", status.target.value, applicationId);
};
</script>

<style lang="scss">
.tableWrapper {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.table thead tr {
  background-color: #009879;
  color: #ffffff;
  font-weight: bold;
}

.table th,
.table td {
  padding: 12px 15px;
}

.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.tableAddBtn {
  margin: 10px 0 0 0;
}
</style>
