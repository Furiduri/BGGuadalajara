<template>
  <form header="" @submit.prevent="Guardar" class="p-card" autocomplete="false">
    <div class="p-card-body">
      <h1 class="p-card-title">Formulario Nuevo negocio</h1>
      <br />
      <div class="grid">
        <div class="md:col-4">
          <label for="Name">Nombre del Negocio</label>
          <span class="p-inputgroup">
            <InputText
              id="Name"
              type="text"
              placeholder="Nombre del Negocio"
              v-model="name"
            />
          </span>
        </div>
        <div class="md:col-4">
          <label for="Adress">Direccion</label>
          <span class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-map"></i>
            </span>
            <InputText
              id="Adress"
              type="address"
              placeholder="Direccion"
              v-model="address"
            />
          </span>
        </div>
        <div class="md:col-4">
          <label for="webpage">Web page</label>
          <span class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-globe"></i>
            </span>
            <InputText
              id="webpage"
              type="text"
              placeholder="Pagina Web"
              v-model="webpage"
            />
          </span>
        </div>
      </div>
      <!-- Footer -->
      <div class="p-card-footer">
        <Button icon="pi pi-save" class="p-button-success" label="Guardar" type="submit">
        </Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { store } from "../../store/store";
import { addBusiness } from "../../services/BusinesService";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const name = ref("");
    const webpage = ref("");
    const address = ref("");
    const toast = useToast();
    const router = useRouter();
    const Guardar = () => {
      addBusiness({
        name: name.value,
        address: address.value,
        webpage: webpage.value,
        user_id: store.user.id,
        description: "",
        picture_url: "",
        business_lineID: 1,
      }).then(() => {
        toast.add({severity: 'success', summary: 'Negocio agregado'});
        router.push({ name: "BusinessProfile"});
      })
      .catch((e)=>{
        toast.add({severity:"error", summary: e.message});
      });
    };
    return {
      name,
      webpage,
      address,
      Guardar
    };
  },
});
</script>

<style scoped></style>
