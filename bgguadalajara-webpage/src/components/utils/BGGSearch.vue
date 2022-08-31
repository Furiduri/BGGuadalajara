<template>
  <div>
    <AutoComplete
      v-model="search"
      :suggestions="optionGames"
      @complete="SearchGame($event)"
      optionLabel="GameName"
      @item-select="SelectGame($event)"
    >
      <template #item="slotProps">
        <div>
          <p>
            <strong>
              {{ slotProps.item.GameName }}
            </strong>
            [ {{ slotProps.item.Yearpublished }} ]
          </p>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { BggApi, IGameBoard } from "../../utils/BggApi";
import AutoComplete from "primevue/autocomplete";
import { defineComponent } from 'vue'

export default defineComponent( {
    emits: ['OnSelected'],
  setup(props,{emit}) {
    const search = ref<IGameBoard>();
    const optionGames = ref<IGameBoard[]>();
    async function SearchGame(event: any) {
      const res = await BggApi.getGamesBySearch(event.query);
      optionGames.value = res;      
    }
const SelectGame = async (event: any) => {
        const itemSelect: IGameBoard = event.value;
        const res = await BggApi.getGameByID(itemSelect.IdGame);
        emit('OnSelected',res);
    }
    return {
      search,
      optionGames,
      SearchGame,
      SelectGame,
    };
  },
  computed: {},
  components: {
    AutoComplete,
  },
});
</script>

<style scoped></style>
