<template>
  <v-container>
  
  <login-view/>

</v-container>
</template>

<script>
import LoginView from './LoginView.vue';
export default {
  components: { LoginView },
  created() {
    this.$store.commit("LOGOUT");
    this.$router.push("/logout");
  }
};
</script>
<style scoped>

</style>
