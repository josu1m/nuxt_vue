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
import Agregar from "~/components/prueba/Agregar.vue";
const { pruebas, obtenerPruebas, eliminarPrueba } = usePruebaCrud();

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
};

onMounted(async () => {
  await obtenerPruebas();
});
</script>
