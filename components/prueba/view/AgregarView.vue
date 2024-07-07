<template>
  <div>
    <Agregar
      :isOpen="isAddModalOpen"
      @close="closeAddModal"
      @pruebaAdded="handlePruebaAdded"
    />
    <button @click="openAddModal">Agregar Nueva Prueba</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import Agregar from "~/components/prueba/Agregar.vue";

const emit = defineEmits(["pruebaAgregada"]);
const { obtenerPruebas } = usePruebaCrud();

const isAddModalOpen = ref(false);

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const handlePruebaAdded = async () => {
  await obtenerPruebas();
  closeAddModal();
  emit("pruebaAgregada");
};

onMounted(async () => {
  await obtenerPruebas();
});
</script>
