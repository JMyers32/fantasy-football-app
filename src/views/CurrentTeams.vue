<template>
  <div class="teamDisplay">
    <v-app-bar app  color="primary" dark>
      <v-toolbar-title>Hall Of Records</v-toolbar-title>
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
    <team-display/>
  </div>
</template>

<script>
import TeamDisplay from '../components/TeamDisplay.vue'
import ProfileService from '../services/ProfileService'
export default {
  name:"current-teams",
  components: { TeamDisplay },
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

.teamDisplay{
  width:100vw;
  height:100vh;
}
h2{
 text-align: center;
}

</style>