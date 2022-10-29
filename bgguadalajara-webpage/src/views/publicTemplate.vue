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
  <footer>
    <div class="px-4 md:px-6 lg:px-8">
      <div
        class="py-6 flex flex-column sm:flex-row sm:align-items-center justify-content-between"
      >
        <div>
          <img
            src="img/BGBaner.png"
            alt="Image"
            height="40"
          />
          <div class="mt-2 line-height-3">
            © 2022 BG Guadalajara, Todos los derechos reservados.
          </div>
        </div>
        <div class="mt-3 sm:mt-0">
          <a
          href="https://twitter.com/BgGuadalajara"
          target="_blank"
            class="cursor-pointer text-500 transition-colors transition-duration-150 hover:text-700"
            ><i class="pi pi-twitter text-xl"></i></a
          ><a
          href="https://www.facebook.com/BGGuadalajara/"
          target="_blank"
            class="cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700"
            ><i class="pi pi-facebook text-xl"></i></a
          ><a
          href="https://www.instagram.com/bgguadalajara/"
          target="_blank"
            class="cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700"
            ><i class="pi pi-instagram text-xl"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Menubar from "primevue/menubar";
import { store } from "../store/store";
import { MenuItem } from "primevue/menuitem";

export default defineComponent({
  setup() {
    const menuItems = ref<MenuItem[]>([
      {
        label: "Inicio",
        icon: "pi pi-home",
        name: "Home",
        to: { name: "Home" },
      },
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
