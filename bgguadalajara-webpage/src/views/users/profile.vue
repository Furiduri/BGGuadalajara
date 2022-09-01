<template>
    <div>
        <ProfileUser></ProfileUser>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import ProfileUser from '../../components/ProfileUser.vue';

export default defineComponent({
    setup() {
        
    const route = useRoute();
    console.log(route.query["access_token"]);
        return {};
    },
    components: { ProfileUser }
})
</script>

<style scoped>

</style>