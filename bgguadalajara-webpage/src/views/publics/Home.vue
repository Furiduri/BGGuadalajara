<template>
  <div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-700 text-center">
        <div class="text-blue-600 font-bold mb-3">
          <img src="img/BGIcon.png" alt="BGIcon" />
        </div>
        <div class="text-900 font-bold text-5xl mb-3">
          Board Games Guadalajara
        </div>
        <div class="text-800 font-bold text-4xl mb-5">
          Juego, Convive y Gana!
        </div>
        <div class="text-700 text-2xl mb-5">
          Crea y busca mesa para juegar tus juegos de mesa favoritos.
        </div>
        <router-link :to="{ name: 'Register' }">
          <Button
            label="Registrate, es Gratis!"
            class="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          ></Button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-nogutter surface-section text-800">
      <div
        class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center"
      >
        <section>
          <span class="block text-6xl font-bold mb-1"
            >Crea nuevas experiencias</span
          >
          <p class="mt-0 mb-4 text-4xl text-700 line-height-3">
            Conoce nuevos juegos, haz nuevos amigos, y gana premios en el
            proceso!
          </p>

          <router-link :to="{ name: 'Register' }">
            <Button
              label="Registrarse"
              type="button"
              class="mr-3 p-button-raised"
            ></Button>
          </router-link>
          <router-link :to="{ name: 'Login' }">
            <Button
              label="Ingresa a tu cuenta"
              type="button"
              class="p-button-outlined"
            ></Button>
          </router-link>
        </section>
      </div>
      <div class="col-12 h-20rem md:col-6 overflow-hidden sm:hidden md:block">
        <img
          src="img/Hero01.jpeg"
          alt="Image"
          class="md:ml-auto block md:h-full"
          style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
