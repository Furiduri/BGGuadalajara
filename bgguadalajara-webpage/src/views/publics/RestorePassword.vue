<template>
<Toast />
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="img/BGBaner.png" alt="Sakai logo" class="mb-5" style="width:350px; height:70px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">                    
            <h1>Restablecer Contraseña</h1>   
                    <div class="w-full md:w-10 mx-auto">
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <password id="password1" v-model="password1" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></password>
                        <hr>
                        <div class="formgroup-inline">
                            <label for="password2" class="block text-900 font-medium text-xl mb-2">Repite Contraseña</label>
                            <password id="password2" v-model="password2" placeholder="Repite Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"
                            :class="{'p-invalid': !isEqual}"></password>
                            <InlineMessage v-if="!isEqual">Las contraseñas no coinciden</InlineMessage>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    setup () {
        const password1 = ref<string>("");
        const password2 = ref<string>("");
        const isEqual = computed(()=>{
            return password1.value === password2.value ;
        });

        return {password1, password2, isEqual}
    }
})
</script>

<style scoped>

</style>