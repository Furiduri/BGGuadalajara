<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="img/BGBaner.png" alt="Sakai logo" class="mb-5" style="width:350px; height:70px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">                    
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo</label>
                        <InputText id="email1" v-model="email" type="email" class="w-full mb-3" placeholder="Correo" style="padding:1rem;" aria-autocomplete="none" />
                
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
              :class="{ 'p-invalid': !isEqual }"
            ></Password>
            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Repite tu Contraseña</label
            >
            <Password
              id="password2"
              v-model="password2"
              placeholder="Contraseña"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
              :class="{ 'p-invalid': !isEqual }"></password>
                            <InlineMessage v-if="!isEqual">Las contraseñas no coinciden</InlineMessage>


                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Registrarme" class="w-full p-3 text-xl" @click="register" :disabled="isLoading"></button>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import AuthVue from '../../components/Auth.vue';
import { store } from '../../store/store';
import { supabase } from '../../supabase';
import validator from '../../utils/validator';

export default defineComponent({
    setup () {
        const router = useRouter();
        const checked = ref<boolean>(false);
        const email = ref<string>("");
        const password = ref<string>("");
        const password2 = ref<string>("");
        const isLoading = ref<boolean>(false);
            const isEqual = computed(() => {
            return password.value === password2.value;
        });
        const register = async ()=>{
            if(validator.isEmail(email.value) && isEqual.value){
                let { user, error } = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value
                });
                if(user != null){
                    store.user = user;
                    
                }
            }
        }    
        return {checked,email,password,password2, register, isEqual,isLoading}
    },
    components:{
        AuthVue,
    }
})
</script>

<style scoped>

</style>