<template>
    <v-container>
       <v-card style="width:70vw; " dark>
        <v-card-title style="font-size:2vw; margin-left:27vw;">Leader Board</v-card-title>
      <v-progress-linear
        v-for="(profile, index) in allProfiles"
        :key="index"
        :color="colors[index % colors.length]"
        :height="profile.karma * 8"
        :max-height="40"
        :indeterminate="false"
        :value="profile.karma"
      >
        <v-card >
            <v-row style="display:flex; align-items: center; justify-content: center;">
                <v-col style="flex-grow:1;">
          <v-card-title class="no-wrap">{{ profile.displayName }}&nbsp; |&nbsp; </v-card-title>
        </v-col>
        <v-col style="flex-grow:1; margin-left:-1.8vw; margin-top:.5vh" >
          <v-card-text class="no-wrap">Karma: {{ profile.karma }}</v-card-text>
        </v-col>
        </v-row>
   
        </v-card>
      </v-progress-linear>
    </v-card>
    </v-container>
  </template>
<script>
import ProfileService from '@/services/ProfileService';
export default {
    name:'leader-board',
 data(){
    return{
    colors: ['red', 'green', 'blue', 'yellow', 'purple'],
    allProfiles:[],
 }
},
created(){
    ProfileService.getAllProfiles().then((response) => {
  this.allProfiles = response.data.sort((a, b) => b.karma - a.karma);
});

}
}
</script>

<style>
.no-wrap {
  white-space: nowrap;
}
</style>