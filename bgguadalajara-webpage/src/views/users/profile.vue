<template>
    <div>
        <Avatar></Avatar>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';
import { getUserInfo } from '../../services/UserServise';
import Avatar from '../../components/Avatar.vue';

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
    components: { Avatar }
})
</script>

<style scoped>

</style>