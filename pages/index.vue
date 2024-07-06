<template>
  <div>
    <h1>Mi Página con Dos Modales</h1>

    <button @click="openModal1">Abrir Modal 1</button>
    <button @click="openModal2">Abrir Modal 2</button>

    <!-- Modal 1 -->
    <Modal
      :isOpen="isModal1Open"
      @close="closeModal1"
      size="medium"
      position="center"
    >
      <template #header>
        <h2 class="text-xl font-bold">Modal 1</h2>
      </template>
      <template #content>
        <p>Este es el contenido del Modal 1.</p>
      </template>
      <template #footer>
        <button
          @click="closeModal1"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Modal 1
        </button>
      </template>
    </Modal>

    <!-- Modal 2 -->
    <Modal
      :isOpen="isModal2Open"
      @close="closeModal2"
      size="large"
      position="top"
    >
      <template #header>
        <h2 class="text-xl font-bold">Modal 2</h2>
      </template>
      <template #content>
        <p>Este es el contenido del Modal 2.</p>
      </template>
      <template #footer>
        <button
          @click="closeModal2"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Modal 2
        </button>
      </template>
    </Modal>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

// Estado para Modal 1
const isModal1Open = ref(false);
const openModal1 = () => {
  isModal1Open.value = true;
};
const closeModal1 = () => {
  isModal1Open.value = false;
};

// Estado para Modal 2
const isModal2Open = ref(false);
const openModal2 = () => {
  isModal2Open.value = true;
};
const closeModal2 = () => {
  isModal2Open.value = false;
};
</script>