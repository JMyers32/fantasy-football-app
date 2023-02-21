<template>
  <v-container style="margin-top:15vh;">
    <v-layout align-center justify-center >
      <v-card class="mx-auto" style="width: 30vw;" dark>
        <v-card-title class="text-center" style="font-size:x-large;">Please Sign In</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-alert v-if="invalidCredentials" type="error" class="my-4">Invalid username and password!</v-alert>
            <v-alert v-if="$route.query.registration" type="success" class="my-4">Thank you for registering, please sign in.</v-alert>
            <v-text-field v-model="user.username" label="Username" required autofocus></v-text-field>
            <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
            <router-link style="text-decoration: none;" :to="{ name: 'register-view' }">Need an account?</router-link>
            <v-btn style="margin-left:1vw;" type="submit" color="primary">Sign in</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "login-view",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      invalidCredentials: false
    };
  },
  methods: {
    login() {
      const originalDestination=this.$store.state.originalDestination || '/';
      authService
        .login(this.user)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            // this.$router.push("/");
            this.$store.commit('CLEAR_DESTINATION');
            this.$router.push(originalDestination);
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    }
  }
};
</script>
<style scoped>



</style>
