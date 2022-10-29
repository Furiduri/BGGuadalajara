<template>
    <div>
        <ProfileUser></ProfileUser>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
import { getUserInfo } from '../../services/UserServise';
import ProfileUser from '../../components/ProfileUser.vue';

export default defineComponent({
    created(){
    },
    setup() {        
        const userInfo = ref();        
    const route = useRoute();    
        return {userInfo};
    },
    async mounted(){
        this.userInfo = await getUserInfo();
    },
    components: { ProfileUser }
})
</script>

<style scoped>

</style>