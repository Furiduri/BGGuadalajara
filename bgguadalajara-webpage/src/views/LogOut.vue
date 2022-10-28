<template>
    <div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

export default defineComponent({
    async mounted() {
        const routers = useRouter();
        await supabase.auth.signOut();
        routers.push("/login");        
    },
    setup () {
        console.log('logout')
        return {}
    },
})
</script>

<style scoped>

</style>