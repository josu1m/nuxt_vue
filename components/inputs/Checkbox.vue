<template>
  <div class="custom-checkbox">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="updateValue"
    />
    <label :for="id">
      <span class="checkbox-icon"></span>
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">

/*
const isChecked1 = ref(false);
const isChecked2 = ref(false);

    <Checkbox
      id="myCheckbox1"
      label="Aceptar términos y condiciones"
      v-model="isChecked1"
    />
    <Checkbox
      id="myCheckbox2"
      label="Recibir newsletter"
      v-model="isChecked2"
    />
*/
import { defineProps, defineEmits } from "vue";

interface Props {
  id: string;
  label: string;
  modelValue: boolean;
}

defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>

<style scoped>
/* ... (el mismo estilo que proporcionaste anteriormente) ... */
</style>

<style scoped>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-family: "Arial", sans-serif;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox label {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.checkbox-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid #3498db;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative; /* Añadido para alinear correctamente */
}

.custom-checkbox input:checked ~ label .checkbox-icon {
  background-color: #3498db;
}

.checkbox-icon::after {
  content: "";
  position: absolute;
  display: none;
  left: 5px; /* Ajuste para centrar el checkmark */
  top: 2px; /* Ajuste para centrar el checkmark */
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ label .checkbox-icon::after {
  display: block;
}

.custom-checkbox input:focus ~ label .checkbox-icon {
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
}

.custom-checkbox:hover input ~ label .checkbox-icon {
  border-color: #2980b9;
}
</style>
