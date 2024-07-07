<template>
  <h2>Lista de Pruebas</h2>
  <div v-for="prueba in pruebas" :key="prueba.id">
    <h3>{{ prueba.name }}</h3>
    <p>{{ prueba.content }}</p>
    <img
      v-if="prueba.imagen"
      :src="`http://127.0.0.1:8000/storage/${prueba.imagen}`"
      :alt="prueba.name"
      width="200"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Prueba {
  id: number;
  name: string;
  content: string;
  imagen?: string;
}

const pruebas = ref<Prueba[]>([]);

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/pruebas");
    if (!response.ok) {
      throw new Error(`Error HTTP! status: ${response.status}`);
    }
    pruebas.value = await response.json();
  } catch (error) {
    console.error("Error al obtener las pruebas:", error);
  }
});
</script>
