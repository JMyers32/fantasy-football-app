<template>
  <v-container class="profileVue" fluid fill-height >
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
    <v-card class="d-flex flex-column align-left"  style="height:25vh; width:26vw; margin-left:2vw; margin-bottom: 60vh; border-radius:2vw;" dark><v-card-title class="my-3" style="font-size:xx-large;color:lightblue; padding-left:10vw;" >Oh Hello!</v-card-title>
      <p style="font-size: x-large; width:25vw; padding-left:1.5vw;">Welcome to 12 ADOH. Feel free to check your stats or see which of your players didn't live up to expectations. You can air any league grievances in the appropriate section. Your Karma dictates 
          how you are seen in the eyes of the fantasy god. Praise Be.
        </p> </v-card>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6>
    <v-card dark class="d-flex flex-column align-center" style="height:60vh; width:30vw; margin-left:-13vw; margin-bottom: 40vh;" >
      <v-card-title class="my-3" style="font-size:xx-large">My Profile</v-card-title>
   <v-avatar :size="400">
    <v-img class="pic" v-if="!profile||!profile.profilePicture" src="../assets/generic profile pic.webp"  alt="User Profile Picture" ></v-img>
    <v-img  class="pic" v-else :src="profile.profilePicture"  alt="User Profile Picture"  ></v-img>
  </v-avatar>
    <v-card-title class="mt-5" style="font-size:xx-large">{{ profile.displayName }}</v-card-title>
    <div style="margin-top:3vh;">
    <v-btn x-large v-if="profile.profileId==0" @click="createOverlay=true">Create Profile</v-btn>
    <v-btn x-large v-else @click="editOverlay=true" >Update Profile</v-btn>
  </div>
    <!-- Create Profile Overlay -->
    <v-overlay v-if="createOverlay" :value="true">  
      <v-card style="width:50vw">
        <v-btn icon @click="createOverlay=false"><v-icon>mdi-close</v-icon></v-btn>
      <v-card-title class="headline">Create Profile</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createProfile(profile)">
          <v-text-field v-model="profile.displayName" label="Display Name"></v-text-field>
          <v-text-field v-model="profile.profilePicture" label="Profile Picture URL"></v-text-field>
          <v-btn type="submit" color="primary">Create Profile</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    </v-overlay>
   <!-- Edit Profile Overlay -->
    <v-overlay v-if="editOverlay" :value="true">
      <v-card style="width:50vw">
        <v-btn icon @click="editOverlay=false"><v-icon>mdi-close</v-icon></v-btn>
        <v-card-title class="headline">Edit Profile</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editProfile">
            <v-text-field v-model="profile.displayName" label="Display Name"></v-text-field>
            <v-text-field v-model="profile.profilePicture" label="Profile Picture URL"></v-text-field>
            <v-btn type="submit" color="primary">Update Profile</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-overlay>
  </v-card>
  </v-flex>
  </v-layout>
  </v-container>
</template>

<script>



import ProfileService from '../services/ProfileService'
import CommentService from '../services/CommentService'
import PostService from '../services/PostService'
export default {
  components: { },
  
name:'profile-view',
data(){
  return{
    profile:{},
    createOverlay:false,
    editOverlay:false,
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
computed:{

},
methods:{
  editProfile(){
       ProfileService.updateProfile(this.profile).then((response)=>{
        if(response.status==200){
            this.editOverlay=false;
            ProfileService.getProfile().then((response)=>{
            this.profile=response.data;
          })
        }
       })
    },
    createProfile(profile){
        ProfileService.createProfile(profile).then((response)=>{
            if(response.status==200){
                this.createOverlay=false;
                ProfileService.getProfile().then((response)=>{
                this.profile=response.data;
              })
            }
        })
    },
 
}
}
</script>

<style>
.profileVue {
  background-image: url('../assets/harambe-landscape-monkey-road-clouds.jpg');
  background-size: cover;
  background-position: center;
}


</style>