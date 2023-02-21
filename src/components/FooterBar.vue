<template>
    <v-footer style="background-color:#1E1E1E;height:5vh;">
      <v-row   no-gutters style="justify-content: center; align-items: center;">
        <v-col style="color:lightblue">
          {{ new Date().getFullYear() }} — <strong>12ADOH</strong>
        </v-col>
        <v-col >
          <v-btn dark @click="showResources=true">Resources&nbsp; <v-icon>mdi-book-open</v-icon></v-btn>
          <v-overlay v-if="showResources" :value="true" outlined style="margin-top:-50vh">
            <v-card dark style="width:20vw;">
            <v-btn icon @click="showResources=false"><v-icon>mdi-close</v-icon></v-btn>
            <v-card-title style="margin-left:7vw;">Resources</v-card-title>
          <resources-page/>
        </v-card>
          </v-overlay>
        </v-col>
      </v-row>
    </v-footer>

</template>

<script>
import ResourcesPage from './ResourcesPage.vue'
export default {
  components: { ResourcesPage },
 name:'footer-bar',
 data(){
  return{
    showResources:false,
  }
 }
}
</script>

<style>

</style>