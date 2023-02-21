<template>
  <div id="register" style="margin-top: 15vh;">
    <v-card class="mx-auto"  style="width:30vw;" dark>
      <v-card-title class="text-center" style="font-size:x-large;">Create An Account</v-card-title>
      <v-card-text>
        <form class="form-register" @submit.prevent="register">
          <div class="alert alert-danger" role="alert" v-if="registrationErrors">
            {{ registrationErrorMsg }}
          </div>
          <v-text-field
            label="Username"
            v-model="user.username"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="user.password"
            required
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="user.confirmPassword"
            required
          ></v-text-field>
          <router-link style="text-decoration: none;" :to="{ name: 'login-view' }">Have an account?</router-link>
          <v-btn class="mt-4" color="primary" type="submit" style="margin-left: 1vw; margin-bottom:1vh;">Create Account</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import authService from '../services/AuthService';
export default {
  name: 'register-view',
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      },
    
      registrationErrors: false,
      registrationErrorMsg: 'There were problems registering this user.',
    };
  },
  methods: {
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = 'Password & Confirm Password do not match.';
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: '/login',
                query: { registration: 'success' },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = 'Bad Request: Validation Errors';
            }
          });
      }
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = 'There were problems registering this user.';
    },
    
  },
};
</script>

<style></style>
