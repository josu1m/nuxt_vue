<!-- components/prueba/Eliminar.vue -->
<template>
  <Modal
    :isOpen="isOpen"
    @close="$emit('cancel')"
    size="small"
    position="center"
  >
    <template #header>
      <h2 class="text-xl font-bold text-white">Confirmar eliminación</h2>
    </template>
    
    <template #content>
      <p class="text-white">
        ¿Estás seguro de que quieres eliminar la prueba "{{ prueba?.name }}"?
      </p>
    </template>
    
    <template #footer>
      <div class="flex justify-end space-x-2">
        <button 
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" 
          @click="$emit('confirm')"
        >
          Sí, eliminar
        </button>
        <button 
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors" 
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "~/components/Modal.vue";

defineProps<{
  isOpen: boolean;
  prueba: Prueba | null;
}>();

defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>