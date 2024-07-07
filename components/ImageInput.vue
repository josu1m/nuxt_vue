<template>
  <div
    class="label-image-upload"
    @dragenter.prevent="handleDragEnter"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ 'drag-over': isDragOver }"
  >
    <label :for="id" class="file-label" :class="{ 'has-image': previewUrl }">
      <input
        type="file"
        :id="id"
        class="file-input"
        @change="handleFileChange"
        accept="image/*"
        aria-describedby="file-label"
      />
      <div v-if="!previewUrl" class="placeholder">
        <span class="file-button">{{ placeholderText }}</span>
      </div>
      <div v-else class="image-preview-container">
        <img :src="previewUrl" alt="Vista previa" class="image-preview" />
        <div class="overlay">
          <span class="overlay-text">{{ overlayText }}</span>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

const props = defineProps<{
  id: string;
  initialImage?: string;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: "fileChange", file: File | null): void;
}>();

const previewUrl = ref<string | null>(null);
const isDragOver = ref<boolean>(false);

const placeholderText = computed(() =>
  props.isEditing
    ? "Click para cambiar la imagen"
    : "Click para agregar una imagen"
);

const overlayText = computed(() =>
  props.isEditing
    ? "Click para cambiar la imagen"
    : "Click para cambiar la imagen"
);

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    handleFiles(files);
  }
};

const handleDragEnter = () => {
  isDragOver.value = true;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  const files = event.dataTransfer?.files;
  if (files) {
    handleFiles(files);
  }
};

const handleFiles = (files: FileList) => {
  const file = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
  emit("fileChange", file);
};

onMounted(() => {
  if (props.initialImage) {
    previewUrl.value = props.initialImage;
  }
});

watch(
  () => props.initialImage,
  (newValue) => {
    previewUrl.value = newValue || null;
  }
);
</script>

<style scoped>
.label-image-upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
  transition: border-color 0.3s, height 0.3s;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  height: 50px; /* Altura inicial más pequeña */
}

.file-label.has-image {
  border-color: #675b80;
  height: auto; /* Altura automática cuando hay imagen */
}

.file-input {
  display: none;
}

.placeholder {
  width: 100%;
  height: 100%; /* Ocupa todo el alto del label */
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-button {
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

.file-button:hover {
  color: #0044cc;
}

.image-preview-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.image-preview {
  width: 30%;
  border-radius: 5px;
  background-color: #675b80;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 41, 41, 0.486);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.overlay-text {
  color: white;
  font-size: 14px;
}

.drag-over {
  border-color: #4a0fc9;
}
</style>
