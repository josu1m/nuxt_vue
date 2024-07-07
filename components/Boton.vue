<template>
  <button
    :class="[
      'custom-button',
      sizeClass,
      variantClass,
      { disabled: disabled || isLoading },
    ]"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <span class="button-content">
      <slot v-if="!isLoading">{{ label }}</slot>
      <span v-else>Cargando...</span>
    </span>
    <span class="button-background"></span>
    <span class="button-shine"></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: "small" | "medium" | "large";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits(["click"]);

const isLoading = ref(false);

const sizeClass = computed(() => props.size || "medium");
const variantClass = computed(() => props.variant || "primary");

const handleClick = async (event: MouseEvent) => {
  if (isLoading.value || props.disabled) return;

  isLoading.value = true;
  try {
    await emit("click", event);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) skewX(-25deg);
  }
  100% {
    transform: translateX(200%) skewX(-25deg);
  }
}

.custom-button {
  font-family: "Arial", sans-serif;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 2px;
}

.button-content {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle,
      transparent 1%,
      rgba(255, 255, 255, 0.1) 1%
    )
    center/15000%;
  z-index: 1;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.button-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 3;
  border-radius: 12px;
  transform: translateX(-100%) skewX(-25deg);
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
}

.custom-button:hover .button-content {
  animation: blink 1.5s ease-in-out infinite;
}

.custom-button:hover .button-background {
  background-size: 100%;
  animation: pulse 1.5s ease-in-out infinite;
}

.custom-button:hover .button-shine {
  animation: shine 1s ease-in-out;
}

.custom-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* Size classes */
.small {
  font-size: 12px;
  padding: 8px 16px;
}

.medium {
  font-size: 14px;
  padding: 12px 24px;
}

.large {
  font-size: 16px;
  padding: 16px 32px;
}

/* Variant classes */
.primary {
  background-color: #3b82f6;
  color: white;
}
.primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.secondary {
  background-color: #6b7280;
  color: white;
}
.secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.danger {
  background-color: #ef4444;
  color: white;
}
.danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.success {
  background-color: #10b981;
  color: white;
}
.success:hover:not(:disabled) {
  background-color: #059669;
}

.warning {
  background-color: #f59e0b;
  color: black;
}
.warning:hover:not(:disabled) {
  background-color: #d97706;
}

.info {
  background-color: #06b6d4;
  color: white;
}
.info:hover:not(:disabled) {
  background-color: #0891b2;
}

.light {
  background-color: #f3f4f6;
  color: #1f2937;
}
.light:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.dark {
  background-color: #1f2937;
  color: white;
}
.dark:hover:not(:disabled) {
  background-color: #111827;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled .button-background,
.disabled .button-shine {
  display: none;
}

.custom-button:disabled {
  pointer-events: none;
}
</style>