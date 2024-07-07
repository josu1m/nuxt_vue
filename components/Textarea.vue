<!--Textarea.vue -->
<template>
  <div class="float-label-textarea">
    <textarea
      :value="modelValue"
      @input="handleInput"
      @keyup.enter="$emit('save')"
      :id="id"
      :name="id"
      :required="required"
      :rows="rows"
      :cols="cols"
      placeholder=" "
    ></textarea>
    <label :for="id">{{ label }}</label>
    <div v-if="isLoading" class="loading-indicator"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  modelValue: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "save"): void;
  (e: "edit"): void;
}>();

const isLoading = ref(false);
let debounceTimer: NodeJS.Timeout | null = null;

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;
  emit("update:modelValue", value);

  isLoading.value = true;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    isLoading.value = false;
    if (props.isEditing) {
      emit("edit");
    }
  }, 500);
};

watch(
  () => props.modelValue,
  () => {
    isLoading.value = true;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      isLoading.value = false;
      if (props.isEditing) {
        emit("edit");
      }
    }, 500);
  }
);
</script>

<style scoped>
.float-label-textarea {
  position: relative;
  margin-bottom: 20px;
}

.float-label-textarea textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;
}

.float-label-textarea label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
}

.float-label-textarea textarea:focus,
.float-label-textarea textarea:not(:placeholder-shown) {
  border-color: #007bff;
  outline: none;
}

.float-label-textarea textarea:focus + label,
.float-label-textarea textarea:not(:placeholder-shown) + label {
  top: -10px;
  font-size: 12px;
  background: #fff;
  padding: 0 0.25rem;
  color: #3498db;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}

.loading-indicator {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
