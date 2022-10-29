<template>
        <Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="5000">                
            <template #item="slotProps">
                <Card class="m-1">
                    <template #header>
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
                        alt="{{slotProps.data.image}}"
                        style="height: 15rem" />
                    </template>
                    <template #title>
                        {{slotProps.data.name}}
                    </template>
                    <template #subtitle>
                        {{slotProps.data.category}}
                    </template>
                    <template #content>
                        <p>
                            {{slotProps.data.description}}
                        </p>
                    </template>
                    <template #footer>
                        <Button icon="pi pi-check" label="Participar" />
                    </template>
                </Card>
            </template>
        </Carousel>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    props: ['Data'],
	setup(props,{emit}) {
        const products = ref(props.Data);
		const responsiveOptions = ref([
			{
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '800px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '600px',
				numVisible: 1,
				numScroll: 1
			}
		]);
        return {products, responsiveOptions, }
	}
}
</script>

<style lang="scss" scoped>
</style>