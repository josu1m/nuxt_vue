<template>
  <div class="table-container">
    <table class="reusable-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th v-if="hasActions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="header in headers" :key="header">
            <slot :name="header.toLowerCase()" :value="row[header]">
              {{ row[header] }}
            </slot>
          </td>
          <td v-if="hasActions">
            <slot name="actions" :row="row" :index="index"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface TableData {
  [key: string]: string | number | undefined;
}

const props = defineProps<{
  headers: string[];
  data: TableData[];
  hasActions?: boolean;
}>();

const hasActions = computed(() => props.hasActions ?? false);
</script>

<style scoped>
.table-container {
  width: fit-content;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.reusable-table {
  width: auto;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
}

.reusable-table th,
.reusable-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
}

.reusable-table thead {
  background-color: #634b4b85;
  position: sticky;
  top: 0;
  z-index: 1;
}

.reusable-table th {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease;
}

.reusable-table thead tr:hover th {
  background-color: #3a484e86;
}

.reusable-table tbody tr {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.reusable-table tr:nth-child(even) {
  background-color: #64769ca4;
}

.reusable-table tr:hover {
  background-color: #3979b96c;
  transform: scale(1.01);
}

.reusable-table td {
  position: relative;
  overflow: hidden;
}

.reusable-table td::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.reusable-table tr:hover td::after {
  transform: translateX(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reusable-table tr {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.reusable-table tr:nth-child(1) {
  animation-delay: 0.1s;
}
.reusable-table tr:nth-child(2) {
  animation-delay: 0.2s;
}
.reusable-table tr:nth-child(3) {
  animation-delay: 0.3s;
}
.reusable-table tr:nth-child(4) {
  animation-delay: 0.4s;
}
.reusable-table tr:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.reusable-table th:hover {
  animation: pulse 0.5s ease-in-out;
}

@media (max-width: 600px) {
  .table-container {
    border-radius: 0;
  }
  .table-container {
    width: 100%;
    overflow-x: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
}
</style>
