<template>
  <Modal :isOpen="isOpen" @close="handleClose" size="large" position="top">
    <template #header>
      <h2 class="text-xl font-bold p-0 m-0">Agregar Nueva Prueba</h2>
    </template>

    <template #content>
      <form @submit.prevent="submitForm">
        <div>
          <Input
            id="name"
            label="Nombre"
            v-model="nuevaPrueba.name"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <Input
            id="content"
            label="Contenido"
            v-model="nuevaPrueba.content"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <ImageInput
            id="imagen"
            :initialImage="nuevaPrueba.imagen"
            :isEditing="true"
            label="Imagen"
            @fileChange="handleFileChange"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <div class="justify-between flex">
        <Boton
          @click="submitForm"
          size="small"
          variant="danger"
          :disabled="isSubmitting"
          label="Agregar"
        />
        <Boton
          @click="handleClose"
          size="small"
          variant="primary"
          label="Cancelar"
        />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "pruebaAdded"]);

const isSubmitting = ref(false);
const { nuevaPrueba, agregarPrueba, onFileChangeNuevo } = usePruebaCrud();

const submitForm = async () => {
  if (!nuevaPrueba.value.name || !nuevaPrueba.value.content) {
    console.error("Nombre y contenido son obligatorios.");
    return;
  }

  isSubmitting.value = true;

  try {
    await agregarPrueba();
    emit("pruebaAdded");
    handleClose();
  } catch (error) {
    console.error("Error al agregar la prueba:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleClose = () => {
  nuevaPrueba.value = { name: "", content: "" };
  isSubmitting.value = false;
  emit("close");
};

const handleFileChange = (file: File | null) => {
  const event = {
    target: {
      files: file ? [file] : [],
    },
  } as unknown as Event;
  onFileChangeNuevo(event);
};

//COMO USAR
/*
<button @click="openAddModal">Agregar Nueva Prueba</button>
<Agregar
  :isOpen="isAddModalOpen"
  @close="closeAddModal"
  @pruebaAdded="handlePruebaAdded"
/>

import Agregar from "~/components/prueba/Agregar.vue"; const { pruebas,
obtenerPruebas, eliminarPrueba, } = usePruebaCrud(); const isAddModalOpen =
ref(false); const openAddModal = () => { isAddModalOpen.value = true; }; const
closeAddModal = () => { isAddModalOpen.value = false; }; const handlePruebaAdded
= async () => { await obtenerPruebas(); closeAddModal(); }; onMounted(async ()
=> { await obtenerPruebas(); }); */
</script>
