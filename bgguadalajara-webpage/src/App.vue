<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { store } from "./store/store"
import { supabase } from "./supabase"

export default {
  components: {
},

  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      if(session != null)
        store.user = session.user
    })
    return {
      store,
    }
  },
}
</script>
