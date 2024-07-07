<template>
  <div class="custom-radio">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
    />
    <label :for="id">
      <span class="radio-icon">
        <span class="inner-icon" v-if="isChecked"></span>
      </span>
      {{ label }}
    </label>
  </div>
</template>

<script setup>
//como utilizar
/*
import { ref } from "vue";

const selectedOptions = ref([]);
    <RadioButton
      id="option1"
      name="options"
      label="Opción 1"
      value="option1"
      :modelValue="selectedOptions"
    />
*/
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = ref(false);

// Actualizamos el estado de isChecked al montar el componente
isChecked.value = props.modelValue.includes(props.value);

const handleChange = () => {
  isChecked.value = !isChecked.value;

  if (isChecked.value) {
    // Si se marca, agregamos el valor a la lista
    emit("update:modelValue", [...props.modelValue, props.value]);
  } else {
    // Si se desmarca, filtramos el valor de la lista
    emit(
      "update:modelValue",
      props.modelValue.filter((item) => item !== props.value)
    );
  }
};
</script>

<style scoped>
.custom-radio {
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-family: "Arial", sans-serif;
  margin: 5px;
}

.custom-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio label {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.radio-icon {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #3498db;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin: 5px;
}

.inner-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3498db;
  transition: all 0.2s ease;
  opacity: 0;
}

.custom-radio input:checked ~ label .inner-icon {
  opacity: 1;
}

.custom-radio input:focus ~ label .radio-icon {
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
}

.custom-radio:hover input ~ label .radio-icon {
  border-color: #2980b9;
}
</style>
