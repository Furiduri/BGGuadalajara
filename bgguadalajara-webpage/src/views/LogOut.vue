<template>
    <div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

export default defineComponent({
    async created() {
        const routers = useRouter();
        await supabase.auth.signOut();
        routers.push("/");        
    },
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>