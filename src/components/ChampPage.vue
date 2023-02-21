<template>
  <v-container>
    <v-container>
      <v-card class="mx-auto" style="height:50vh;width:30vw; text-align: center; border-radius:7vw; opacity:90%;" dark>
        <v-card-title style="font-size: xx-large; margin-left:10vw;">League Update</v-card-title>
        <v-img style="border-radius:10%;height:30vh;width:20vw;margin-left:5vw;" src="../assets/Dom.png" alt=""></v-img>
        <v-card-title style="font-size: x-large; margin-left:10vw;">The Champ Is Here</v-card-title>
        <v-card-text class="card-text" style="font-size: larger; width:27vw; margin-left:1.7vw;">Dom has unfortunately won the 2022 12ADOH championship. It was all luck and totally not deserved. Everyone was terribly saddened. Fantasy football god why have you forsaken me. </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
 name:'champ-page',
 data(){
    return{
        team:[],
        isLoading:true
    }
 },
 created(){
    
    
 }

}
</script>

<style scoped>
  
  @media only screen and (max-width: 600px) {
    .card-text {
      font-size: 14px;
    }
  }

  @media only screen and (min-width: 600px) {
    .card-text {
      font-size: 16px;
    }
  }

  @media only screen and (min-width: 768px) {
    .card-text {
      font-size: 18px;
    }
  }

  @media only screen and (min-width: 992px) {
    .card-text {
      font-size: 20px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .card-text {
      font-size: 22px;
    }
  }

  
</style>