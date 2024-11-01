<template>
  <div>
    <h2>{{ tableTitle }}</h2>
    <table class="tableWrapper">
      <thead>
        <tr>
          <th v-for="(header, index) in theader" :key="index">{{ header }}</th>
          <th v-if="isPossibleDeleteItem"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tbody" :key="rowIndex">
          <td v-for="(key, cellIndex) in Object.keys(row)" :key="cellIndex">
            {{ row[key] ? row[key] : "-" }}
          </td>
          <td v-if="isPossibleDeleteItem" @click="$emit('deleteData', row)">
            X
          </td>
        </tr>
      </tbody>
    </table>
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
});
defineEmits(["addData", "deleteData"]);
</script>

<style lang="scss">
.tableWrapper {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.tableWrapper thead tr {
  background-color: #009879;
  color: #ffffff;
  font-weight: bold;
}

.tableWrapper th,
.tableWrapper td {
  padding: 12px 15px;
}

.tableWrapper tbody tr {
  border-bottom: 1px solid #dddddd;
}

.tableWrapper tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.tableWrapper tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.tableWrapper tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
.tableAddBtn {
  margin: 10px 0 0 0;
}
</style>
