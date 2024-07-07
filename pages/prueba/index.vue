<template>
  <div>
    <AgregarView @pruebaAgregada="refreshPruebas" />
    <div v-for="prueba in pruebas" :key="prueba.id">
      <h3>{{ prueba.name }}</h3>
      <p>{{ prueba.content }}</p>
      <img
        v-if="prueba.imagen"
        :src="`http://127.0.0.1:8000/storage/${prueba.imagen}`"
        :alt="prueba.name"
        width="200"
      />
      <button @click="openEditModal(prueba)">Editar</button>
      <button @click="openDeleteConfirmation(prueba)">Eliminar</button>
    </div>
    
    <EditarModal
      :isModalOpen="isModalOpen"
      :nombreEditar="nombreEditar"
      :contenidoEditar="contenidoEditar"
      :imagenEditar="imagenEditar"
      @update:nombreEditar="nombreEditar = $event"
      @update:contenidoEditar="contenidoEditar = $event"
      @close="closeModal"
      @save="actualizarPruebaLocal"
      @fileChange="onFileChangeEditar"
    />

    <ConfirmacionEliminar
      :isOpen="isDeleteConfirmationOpen"
      :prueba="pruebaAEliminar"
      @confirm="confirmarEliminacion"
      @cancel="cancelarEliminacion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EditarModal from "~/components/prueba/Editar.vue";
import AgregarView from "~/components/prueba/view/AgregarView.vue";
import ConfirmacionEliminar from "~/components/prueba/Eliminar.vue";

const {
  pruebas,
  pruebaEnEdicion,
  obtenerPruebas,
  actualizarPrueba,
  seleccionarPruebaParaEditar,
  cancelarEdicion,
  onFileChangeEditar,
  eliminarPrueba,
} = usePruebaCrud();

const nombreEditar = ref("");
const contenidoEditar = ref("");
const imagenEditar = ref("");
const isModalOpen = ref(false);
const isDeleteConfirmationOpen = ref(false);
const pruebaAEliminar = ref<Prueba | null>(null);

const openEditModal = (prueba: Prueba) => {
  seleccionarPruebaParaEditar(prueba);
  nombreEditar.value = prueba.name;
  contenidoEditar.value = prueba.content;
  imagenEditar.value = prueba.imagen
    ? `http://127.0.0.1:8000/storage/${prueba.imagen}`
    : "";
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  cancelarEdicion();
  nombreEditar.value = "";
  contenidoEditar.value = "";
  imagenEditar.value = "";
};

const actualizarPruebaLocal = async () => {
  if (pruebaEnEdicion.value) {
    pruebaEnEdicion.value.name = nombreEditar.value;
    pruebaEnEdicion.value.content = contenidoEditar.value;
    await actualizarPrueba();
    closeModal();
    await obtenerPruebas();
  }
};

const openDeleteConfirmation = (prueba: Prueba) => {
  pruebaAEliminar.value = prueba;
  isDeleteConfirmationOpen.value = true;
};

const confirmarEliminacion = async () => {
  if (pruebaAEliminar.value && pruebaAEliminar.value.id) {
    await eliminarPrueba(pruebaAEliminar.value.id);
    await obtenerPruebas();
    cancelarEliminacion();
  }
};

const cancelarEliminacion = () => {
  isDeleteConfirmationOpen.value = false;
  pruebaAEliminar.value = null;
};

const refreshPruebas = async () => {
  await obtenerPruebas();
};

onMounted(obtenerPruebas);
</script>