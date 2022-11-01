<template>
  <ProfileUser></ProfileUser>
  <Divider align="center">
    <Button
      @click="goBusinessProfile"
      icon="pi pi-briefcase"
      class="p-button-info p-button-outlined"
      label="Ver mi cuenta de negocios"
    >
    </Button>
  </Divider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo } from "../../services/UserServise";
import ProfileUser from "../../components/ProfileUser.vue";

export default defineComponent({
  created() {},
  setup() {
    const userInfo = ref();
    const router = useRouter();
    const goBusinessProfile = () => {
      router.push({ name: "BusinessProfile" });
    };
    return { userInfo, router, goBusinessProfile };
  },
  async mounted() {
    //this.userInfo = await getUserInfo();
  },
  components: { ProfileUser },
});
</script>

<style scoped></style>
