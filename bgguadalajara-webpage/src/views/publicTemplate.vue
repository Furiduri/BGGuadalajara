<template>
  <Toast />
  <Menubar :model="menuItems">
    <template #start>
      <a href="/">
        <img alt="logo" src="img/BGIcon.png" height="40" class="mr-2" />
      </a>
    </template>
  </Menubar>
  <Message
    v-if="errorMsg != null"
    severity="error"
    :closable="true"
    @close="CloseErrorMsg"
    >[{{ errorMsg?.status }} ] {{ errorMsg?.message }}</Message
  >
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Menubar from "primevue/menubar";
import { store } from "../store/store";
import { MenuItem } from "primevue/menuitem";

export default defineComponent({
  setup() {
    const menuItems = ref<MenuItem[]>([
      { label: "Inicio", icon: "pi pi-home", to: "/" },
      {
        label: "Iniciar session",
        class: "p-button-outlined p-button-info",
        to: "/login",
      },
      {
        label: "Crear cuenta",
        class: "p-button-outlined",
        to: "/register",
      },
    ]);

    const errorMsg = computed(() => {
      return store.Error;
    });
    const CloseErrorMsg = () => {
      console.log(store.Error);
      store.Error = null;
    };

    return { menuItems, errorMsg, CloseErrorMsg };
  },
  components: {
    Menubar,
  },
});
</script>

<style scoped></style>
