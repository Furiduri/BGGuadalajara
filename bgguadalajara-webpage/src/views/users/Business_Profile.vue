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
          :disabled="!isReadOnly"
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
      </div>
    </div>
  </div>

  <Divider> </Divider>
  <Card v-if="selectBusiness != null"> 
    <template #header v-if="selectBusiness.picture_url != ''">
        <img :src="selectBusiness.picture_url" :alt="selectBusiness.name"/>
    </template>
    <template #title>
      <div class="grid">
        <div class="col-8">
          <h2 v-if="isReadOnly">{{ selectBusiness.name}}</h2>
          <InputText :modelValue="selectBusiness.name" class="p-inputtext-lg" v-else></InputText>
        </div>
        <div class="col-4 text-right">
          <div class="p-buttonset" v-if="!isReadOnly">
            <Button icon="pi pi-save" label="Guardar" class="p-button-success" @click="click_save" ></Button>          
            <Button icon="pi pi-times" label="Cancelar" class="p-button-danger p-button-outlined" @click="click_cancel"></Button>
          </div>
          <Button icon="pi pi-pencil" label="Editar" @click="click_Edit" v-if="isReadOnly"></Button>
        </div>
      </div>
    </template>
    <template #subtitle>
      <div>
        <a :href="'https://'+selectBusiness.webpage" target="_blank" v-if="isReadOnly && selectBusiness.webpage != ''">
          <i class="pi pi-globe"></i> 
          {{selectBusiness.webpage}}        
        </a>
        <div class="p-input-icon-left" v-else>
          <i class="pi pi-globe"></i>
          <InputText title="Pagina web" placeholder="Pagina web" :modelValue="selectBusiness.webpage" ></InputText>
        </div>
      </div>
      <div>
        {{selectBusiness.business_line}}
      </div>
    </template>
    <template #content>
      <div class="grid">
        <div class="md:col-6">
          <h3>Descripcion</h3>  
          <p v-if="isReadOnly">
              {{selectBusiness.description}}
          </p>
          <Textarea v-else v-model="selectBusiness.description"  :autoResize="true" rows="5" cols="30" class="w-full" />
        </div>
        <div class="md:col-6">
          <h3>Direccion</h3>          
          <p v-if="isReadOnly">
              {{selectBusiness.address}}
          </p>
          <Textarea v-else v-model="selectBusiness.address"  :autoResize="true" rows="5" cols="30" class="w-full" />
        </div>
      </div>
    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Save"  />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Business, chgBusiness, getMyBusiness } from "../../services/BusinesService";
import { store } from "../../store/store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const List_bussines = ref<Business[] | null>();
    const selectBusiness = ref<Business | null>(null);
    const isReadOnly = ref(true);

    const click_newbusines = () => {
      router.push({ name: "NewBusiness" });
    };

    const click_Edit = () => {
      store.Loading = true;
      isReadOnly.value = false;      
      store.Loading = false;
    }

    const click_cancel = () => {
      store.Loading = true;      
      selectBusiness.value = List_bussines.value.find((x)=>x.id == selectBusiness.value.id);
      isReadOnly.value = true;
      store.Loading = false;
    }

    const click_save = async() => {
      store.Loading = true;
      const result = await chgBusiness(selectBusiness.value);
      selectBusiness.value = result;
      List_bussines.value = await getMyBusiness();
      isReadOnly.value = true;
      store.Loading = false;
    }

    return { List_bussines,
       selectBusiness,
       isReadOnly,
       click_Edit,
       click_save,
       click_cancel,
         click_newbusines };
  },
  async mounted() {    
    store.Loading = true;
    this.List_bussines = await getMyBusiness();
    store.Loading = false;
  },
});
</script>

<style scoped></style>
