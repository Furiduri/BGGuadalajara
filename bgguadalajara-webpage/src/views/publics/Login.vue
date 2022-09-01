<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img
          src="img/BGBaner.png"
          alt="Sakai logo"
          class="mb-5"
          style="width: 350px; height: 70px"
        />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <h1>Iniciar Sessión</h1>
          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2"
              >Correo</label
            >
            <InputText
              id="email1"
              v-model="email"
              type="text"
              class="w-full mb-3"
              placeholder="Correo"
              style="padding: 1rem"
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Contraseña</label
            >
            <Password
              id="password1"
              v-model="password"
              placeholder="Contraseña"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
            ></Password>

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox
                  id="rememberme1"
                  v-model="checked"
                  :binary="true"
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Recuerdame</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                @click="dgRestorePass = true"
                >Olvidaste tu contraseña?</a
              >
            </div>
            <Button
              label="Ingresar"
              @click="LoginEmail"
              class="w-full p-3 text-xl"
              :disabled="loading"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    header="Restablecer contraseña"
    v-model:visible="dgRestorePass"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '350px' }"
    :modal="true"
  >
    <div class="confirmation-content">
      <label for="emailRestart" class="block text-900 text-xl font-medium mb-2"
        >Ingresa tu Correo</label
      >
      <span class="p-tag p-tag-info"
        >Se te enviara un correo con los pasos a seguir</span
      >
      <InputText
        id="emailRestart"
        v-model="emailRestart"
        type="email"
        class="w-full mt-3"
        placeholder="Correo"
        style="padding: 1rem"
      />
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="dgRestorePass = false"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="RestartPassword"
        :disabled="loading"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthVue from "../../components/Auth.vue";
import { store } from "../../store/store";
import { supabase } from "../../supabase";
import validator from "../../utils/validator";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  setup() {
    const checked = ref<boolean>(false);
    const email = ref<string>("");
    const password = ref<string>("");
    const loading = ref<boolean>(false);
    const dgRestorePass = ref<boolean>(false);
    const emailRestart = ref<string>("");
    const toast = useToast();
    //Fuctions
    const LoginEmail = async () => {
      loading.value = true;
      if (validator.isEmail(email.value) && password.value.length > 6) {
        const { user, session, error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error == null) {
          store.user = user;
          toast.add({
            life: 5000,
            severity: "success",
            summary: "Ingreso exitoso!",
            detail: `Bienvenido ${"Usuario"}`,
          });
        } else {
          toast.add({
            life: 5000,
            severity: "error",
            summary: `Error: ${error.status}`,
            detail: `${error.message}`,
          });
        }
      }
      loading.value = false;
    };

    const RestartPassword = async () => {
      loading.value = true;
      console.log(validator.isEmail(emailRestart.value));
      if (validator.isEmail(emailRestart.value)) {
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(
          emailRestart.value
        );
        if (error != null) {
          toast.add({
            life: 5000,
            severity: "error",
            summary: `Error: ${error.status}`,
            detail: `${error.message}`,
          });
        }
        toast.add({
          life: 10000,
          severity: "success",
          summary: `Se a enviado un correo a ${emailRestart.value}`,
          detail:
            "Si no encuentras el correo, favor de revisar la bandeja de spam, o intentarlo mas tarde.",
        });
        dgRestorePass.value = false;
      }
      loading.value = false;
    };

    return {
      checked,
      email,
      password,
      loading,
      dgRestorePass,
      emailRestart,
      LoginEmail,
      RestartPassword,
    };
  },
  components: {
    AuthVue,
  },
});
</script>

<style scoped></style>
