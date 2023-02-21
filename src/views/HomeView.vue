<template>
 <v-container class="home" fluid fill height>
  <v-app-bar v-if="this.$store.state.token!=''" app  color="primary" dark>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar ><v-img :src="profile.profilePicture"></v-img></v-avatar>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.to" router>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="this.$store.state.token == ''" :to="'/login'" router>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="this.$store.state.token != ''" :to="'/logout'" router>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
  <champ-page class="champ" />
 </v-container>
</template>

<script>
import ChampPage from '../components/ChampPage.vue'
import ProfileService from '@/services/ProfileService'
  export default {
    name: 'Home-View',
    
    components: {
        ChampPage,
        
    },
    data(){
      return{
        profile:{},
        links: [
        { text: "Home", to: "/" },
        { text: "Stats", to: "/currentTeams" },
        { text: "Profile", to: "/profile" },
        { text: "Air Grievances", to: "/messages" },
      ]
      }
    },
    created(){
      ProfileService.getProfile().then((response)=>{
        this.profile=response.data;
      })
    }
}
  
</script>

<style scoped>
.home{
  background-image: url('../assets/harambe\ surfing.png');
  background-size: cover;
  background-position: center;
  height:100vh;
}
@keyframes jump {
  0% {
    transform: translateX(-50vw);
  }
  25% {
    transform: translateX(0);
  }
  50% {
    transform: translateX();
  }
  75% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}
.champ{
  margin-left:-16.5vw;
  margin-top:20vh;
  animation: jump 8s;
}



</style>