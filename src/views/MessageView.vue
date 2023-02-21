<template>
  <v-container>
    <v-app-bar app  color="primary" dark>
      <v-toolbar-title>Fantasy Football Festivus</v-toolbar-title>
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
    <v-container v-if="profile.displayName==null" class="text-center" >
  <h1>Create A Profile To Start Complaining</h1>
  <router-link to="/profile" style="text-decoration:none">
    <v-btn class="airBtn" width="20vw" height="7vh" rounded>
      <span class="no-underline"  >Create A Profile!</span>
    </v-btn>
  </router-link>
  <v-img src="../assets/Harambe Football.png" class="mx-auto" width="100%" style="border-radius:2vw;"></v-img>
</v-container>
  <v-container v-show="profile.displayName!=null" >
      <v-row class="d-flex flex-row flex-wrap">
  <v-col cols="12" sm="6" md="4" style="margin-top:10.6vh; margin-left:-12vw; display: flex; justify-content: center;">
    <v-img style="width: 100%; max-width: 1000px; border-radius: .5vw;" src="../assets/harambe football 2.png"></v-img>
  </v-col>
  <v-col cols="12" sm="6" md="8">
    <message-board style="width:75vw"/> 
  </v-col>
</v-row>
  </v-container>
</v-container>
</template>

<script>
import MessageBoard from '../components/MessageBoard.vue'
import ProfileService from '@/services/ProfileService';
import PostService from '@/services/PostService';
import CommentService from '@/services/CommentService';
export default {
  components: { MessageBoard },
name:'message-view',
data(){
  return{
    profile:{},
    allUserPosts:[],
    allUserComments:[],
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
 PostService.getPostsFromUser().then((response)=>{
  this.allUserPosts=response.data;
})
CommentService.getAllUserComments().then((response)=>{
  this.allUserComments=response.data;
})
},
methods:{
  totalKarma(){
  let totalPostKarma=0;
  let totalCommentKarma=0;
  
  for(let i=0;i<this.allUserPosts.length;i++){
    totalPostKarma+=Number.parseInt(this.allUserPosts[i].karma);
  }
  for(let i=0;i<this.allUserComments.length;i++){
    totalCommentKarma+=Number.parseInt(this.allUserComments[i].karma);
  }
  console.log(totalCommentKarma)
  console.log(totalPostKarma)
  let allKarma=totalPostKarma+totalCommentKarma;
  this.profile.karma=allKarma;
  ProfileService.updateProfile(this.profile);
  return allKarma;
 }
}
}
</script>

<style scoped>

</style>