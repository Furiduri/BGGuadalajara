<template>
  <h1>Gestion de tus negocios</h1>
  <div class="grid">
    <div class="col-10 m-auto">
      <div class="p-inputgroup">
        <Button
          class="p-button-info p-button-outlined"
          label="Agregar negocio"
          icon="pi pi-plus"
          @click="click_newbusines"
        >
        </Button>
        <Dropdown
          id="cmbBusiness"
          v-model="selectBusiness"
          :options="List_bussines"
          optionLabel="name"
          placeholder="Seleciona tu negocio"
          :showClear="true"
        >
          <template #value="slotProps">
            <div class="" v-if="slotProps.value">
              <b>{{ slotProps.value.name }}</b>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="">
              <b>{{ slotProps.option.name }}</b>
            </div>
          </template>
        </Dropdown>
        <Button
          icon="pi pi-check"
          class="p-button-success"
          label="Cargar"
          @click="LoadBusiness"
        >
        </Button>
      </div>
    </div>
  </div>

  <Divider> </Divider>
  <Card :title="selectBusiness.name" v-if="selectBusiness != null"> </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getMyBusiness } from "../../services/BusinesService";
import { store } from "../../store/store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const List_bussines = ref();
    const selectBusiness = ref(null);

    const LoadBusiness = () => {
      store.Loading = true;
      store.Loading = false;
    };

    const click_newbusines = () => {
      router.push({ name: "NewBusiness" });
    };

    return { List_bussines, selectBusiness, LoadBusiness, click_newbusines };
  },
  async mounted() {
    this.List_bussines = await getMyBusiness();
  },
});
</script>

<style scoped></style>
