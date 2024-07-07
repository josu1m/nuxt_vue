import { ref } from "vue";

export interface Prueba {
  id?: number;
  name: string;
  content: string;
  imagen?: string;
}

const BASE_URL = "http://127.0.0.1:8000/api/pruebas";

export function usePruebaCrud() {
  const pruebas = ref<Prueba[]>([]);
  const nuevaPrueba = ref<Prueba>({ name: "", content: "" });
  const pruebaEnEdicion = ref<Prueba | null>(null);
  let imagenFileNuevo: File | null = null;
  let imagenFileEditar: File | null = null;

  const obtenerPruebas = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Error al obtener las pruebas.");
      }
      const data: Prueba[] = await response.json();
      pruebas.value = data;
    } catch (error) {
      console.error("Error al obtener las pruebas:", error);
    }
  };

  const agregarPrueba = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nuevaPrueba.value.name);
      formData.append("content", nuevaPrueba.value.content);
      if (imagenFileNuevo) {
        formData.append("imagen", imagenFileNuevo);
      }

      const response = await fetch(BASE_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al agregar la prueba.");
      }
      const data: Prueba = await response.json();
      pruebas.value.push(data);
      nuevaPrueba.value = { name: "", content: "" };
      imagenFileNuevo = null;
    } catch (error) {
      console.error("Error al agregar la prueba:", error);
    }
  };

  const actualizarPrueba = async () => {
    if (!pruebaEnEdicion.value) return;

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", pruebaEnEdicion.value.name);
      formData.append("content", pruebaEnEdicion.value.content);
      if (imagenFileEditar) {
        formData.append("imagen", imagenFileEditar);
      }

      const response = await fetch(`${BASE_URL}/${pruebaEnEdicion.value.id}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al actualizar la prueba.");
      }
      const data: Prueba = await response.json();

      const index = pruebas.value.findIndex(
        (p) => p.id === pruebaEnEdicion.value!.id
      );
      if (index !== -1) {
        pruebas.value[index] = data;
      }

      cancelarEdicion();
    } catch (error) {
      console.error("Error al actualizar la prueba:", error);
    }
  };

  const eliminarPrueba = async (pruebaId: number | undefined) => {
    if (!pruebaId) {
      console.error("ID de prueba no válido.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${pruebaId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la prueba.");
      }
      pruebas.value = pruebas.value.filter((prueba) => prueba.id !== pruebaId);
    } catch (error) {
      console.error("Error al eliminar la prueba:", error);
    }
  };

  const seleccionarPruebaParaEditar = (prueba: Prueba) => {
    pruebaEnEdicion.value = { ...prueba };
  };


  const cancelarEdicion = () => {
    pruebaEnEdicion.value = null;
    imagenFileEditar = null;
  };

  const onFileChangeNuevo = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      imagenFileNuevo = target.files[0];
    }
  };

  const onFileChangeEditar = (event: Event | null) => {
    if (event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        imagenFileEditar = target.files[0];
      }
    } else {
      imagenFileEditar = null;
    }
  };
  onMounted(() => {
    obtenerPruebas();
  });
  return {
    pruebas,
    nuevaPrueba,
    pruebaEnEdicion,
    obtenerPruebas,
    agregarPrueba,
    actualizarPrueba,
    eliminarPrueba,
    seleccionarPruebaParaEditar,
    cancelarEdicion,
    onFileChangeNuevo,
    onFileChangeEditar,
  };
}
