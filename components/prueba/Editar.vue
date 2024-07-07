<template>
  <Modal :isOpen="isModalOpen" @close="$emit('close')">
    <template #header>
      <h2 class="text-xl font-semibold">Editar prueba</h2>
    </template>
    <template #content>
      <form @submit.prevent="$emit('save')">
        <Input
          id="nombreEditar"
          label="Nombre"
          :modelValue="nombreEditar"
          @update:modelValue="$emit('update:nombreEditar', $event)"
          :isEditing="true"
          required
        />

        <Textarea
          id="contenidoEditar"
          label="Contenido"
          :modelValue="contenidoEditar"
          @update:modelValue="$emit('update:contenidoEditar', $event)"
          :isEditing="true"
          required
        />

        <ImageInput
          id="imagenEditar"
          :initialImage="imagenEditar"
          :isEditing="true"
          label="Imagen a editar"
          @fileChange="handleFileChange"
        />
      </form>
    </template>
    <template #footer>
      <button @click="$emit('save')">Guardar Cambios</button>
      <button @click="$emit('close')">Cancelar</button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
interface Props {
  isModalOpen: boolean;
  nombreEditar: string;
  contenidoEditar: string;
  imagenEditar: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:nombreEditar", value: string): void;
  (e: "update:contenidoEditar", value: string): void;
  (e: "close"): void;
  (e: "save"): void;
  (e: "fileChange", event: Event | null): void; // Cambiado a Event | null
}>();

const handleFileChange = (file: File | null) => {
  if (file) {
    const event = { target: { files: [file] } } as unknown as Event;
    emit("fileChange", event);
  } else {
    // Manejar la eliminación de la imagen
    emit("fileChange", null);
  }
};
</script>
