<template>
  <div class="p-card col-10 m-auto">
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="grid">
        <div class="md:col-4">
          <div class="text-center">
            <AvatarVue
              v-model:path="avatar_url"
              @upload="updateProfile"
              sizes="10"
            />
          </div>
        </div>
        <div class="md:col-6">
          <div class="p-fluid grid">
            <!-- Email -->
            <div class="field col-12 md:col-6">
              <label class="text-2xl" for="email">Email</label>
              <InputText
                id="email"
                type="email"
                :value="store.user.email"
                disabled="true"
                class="w-full"
              ></InputText>
            </div>
            <!-- User Name -->
            <div class="field col-12 md:col-6">
                <label class="text-2xl" for="username">Nombre de Usuario</label>
                <InputText id="username" type="text" v-model="username" />
            </div>
          </div>
          <Divider type="solid">
            <span class="inline-flex align-items-center">
              <i class="pi pi-user mr-2"></i>
              <b>Datos personales</b>
            </span>
          </Divider>
          <div class="p-fluid grid">
            <div class="field col-12 md:col-4">
              <span class="p-float-label">
                <InputText id="fristName" type="text" v-model="fristName" />
                <label for="fristName">Nombres</label>
              </span>
            </div>
            <div class="field col-12 md:col-4">
              <span class="p-float-label">
                <InputText id="lastName" type="text" v-model="lastName" />
                <label for="lastName">Apellido Paterno</label>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-right">
        <input
          type="submit"
          class="p-button p-button-success p-button-lg p-button-rounded"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { supabase } from "../supabase";
import { store } from "../store/store";
import { onMounted, ref } from "vue";
import AvatarVue from "./Avatar.vue";
import Profile from "../services/Models/Profile";
import { useToast } from "primevue/usetoast";
export default {
  setup() {
    const loading = ref(true);
    const avatar_url = ref("");
    const username = ref("");
    const fristName = ref("");
    const lastName = ref("");
    const toast = useToast();
        
    async function getProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from<Profile>("profiles")
          .select(`*`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          avatar_url.value = data.avatar_url;
          username.value = data.username;
          fristName.value = data.FristName;
          lastName.value = data.LastName;
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;
        const user = supabase.auth.user();

        const updates = <Profile>{
          id: user.id,
          username: username.value,
          avatar_url: avatar_url.value,
          FristName: fristName.value,
          LastName: lastName.value,
          updated_at: new Date(),
        };

        let { error } = await supabase
          .from<Profile>("profiles")
          .upsert(updates, {
            returning: "minimal", // Don't return the value after inserting
          });

        if (error) throw error;
      } catch (error: any) {
        alert(error.message);
      } finally {
        loading.value = false;
        toast.add({severity:'success', summary: 'Datos Guardadados', life: 3000});
      }
    }

    onMounted(() => {
      getProfile();
    });

    return {
      store,
      loading,
      username,
      avatar_url,
      fristName,
      lastName,

      updateProfile,
    };
  },
  components: {
    AvatarVue,
  },
};
</script>
