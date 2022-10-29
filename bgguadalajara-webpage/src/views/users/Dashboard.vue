<template>
    <div>
        
    </div>
    <div>
        <EventsCarusel :Data="Data" v-if="Data != null" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import EventsCarusel from '../../components/utils/EventsCarusel.vue';
import EventsService from '../../services/Events';
export default defineComponent({
    setup () {        
        onMounted(() => {
            eventsService.value.getProductsSmall().then(data => Data.value = data.slice(0,9));
        })
        const eventsService = ref(new EventsService());
        const Data = ref(null);
        return {Data, eventsService}
    },
    components: {
        EventsCarusel,
    },
})
</script>

<style scoped>

</style>