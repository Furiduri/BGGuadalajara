<template>
    <div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

export default defineComponent({
    setup () {
        const routers = useRouter();
        supabase.auth.signOut().then( (res)=>{
            routers.push("login");
        }           
        );

        return {}
    }
})
</script>

<style scoped>

</style>