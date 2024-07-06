<template>
  <div class="font-sans relative">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" :class="backdropClass" @click="closeModal">
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            @click.stop
            :class="modalSizeClass"
            class="bg-slate-800 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl mx-auto overflow-hidden transform transition-all m-4 p-0"
          >
            <div class="p-4 space-y-4 text-white">
              <slot name="header"> </slot>

              <slot name="content"> </slot>

              <slot name="footer"> </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) =>
      ["small", "medium", "large", "extra-large"].includes(value),
  },
  position: {
    type: String,
    default: "center",
    validator: (value) => ["top", "center", "bottom"].includes(value),
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const modalSizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "w-full sm:max-w-xs md:max-w-sm";
    case "large":
      return "w-full sm:max-w-lg md:max-w-2xl";
    case "extra-large":
      return "w-full sm:max-w-xl md:max-w-4xl";
    default:
      return "w-full sm:max-w-md md:max-w-lg";
  }
});

const backdropClass = computed(() => {
  let baseClass =
    "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center py-2 z-50";
  switch (props.position) {
    case "top":
      return baseClass.replace("items-center", "items-start");
    case "bottom":
      return baseClass.replace("items-center", "items-end");
    default:
      return baseClass;
  }
});
</script>
