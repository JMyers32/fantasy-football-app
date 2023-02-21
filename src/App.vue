<template>
  <v-app >
<v-main id="app">
  <v-toolbar app fixed dark  elevation="10">
<v-toolbar-title class="headline text-uppercase">
  <span>12ADOH &nbsp;</span>
  <v-avatar>
    <v-img src="./assets/harambe-meme-pic.jpg"></v-img>
  </v-avatar>
</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn flat :to="{name:'Home-View'}" exact>Home</v-btn>
<v-btn flat :to="{name:'current-teams'}">Stats</v-btn>
<v-btn flat :to="{name:'message-view'}">Air Grievances</v-btn>
<v-btn flat :to="{name:'profile-view'}">Profile</v-btn>
<v-btn flat :to="{ name: 'login-view' }" v-if="this.$store.state.token == ''">Login</v-btn>
<v-btn flat :to="{ name: 'logout-view' }" v-if="this.$store.state.token != ''">Logout</v-btn>

 </v-toolbar>

      <router-view />
    </v-main>
    <footer-bar />
  </v-app>
</template>

<script>
import FooterBar from './components/FooterBar.vue';
// import NavPanel from './components/NavPanel.vue';

export default {
  components: { FooterBar },
  // components: { NavPanel },
  name: 'App',

  data: () => ({
   
  }),


};
</script>
<style>

#app{
  background-color:rgba(126, 128, 128, 0.171);
  
}
#harambe{
  display: block;
  margin:0 auto;
  padding-top: 10vh;
  border-radius:70%;
 }
</style>
