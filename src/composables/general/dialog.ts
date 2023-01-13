import { ref } from "vue";

export function useDialog() {
  const open = ref<boolean>(false);

  const toggle = () => {
    open.value = !open.value;
  };

  return { open, toggle };
}
