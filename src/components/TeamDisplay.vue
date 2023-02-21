  <template>
    <v-container v-if="isLoading" class="teamPage">
      <img  src="../assets/harambe-gorilla.gif" alt="">
    </v-container>
      <v-container style="height:auto; margin-top:4vh;" v-else>
        <v-row style="width:100vw; margin-left:-8vw;">
          <v-col md="4">
            <v-card dark>
              <v-card-title>Team Info</v-card-title>
              <v-select v-model="selectedSeason" :items="seasons" label="Select season" item-text="name" item-value="year" outlined dense  style="width:7vw"></v-select>
              <v-data-table :headers="headers" :items="teams" :items-per-page="12" class="elevation-1"></v-data-table>
            </v-card>
          </v-col>
          <v-col md="2" >
    <v-card dark>
      <v-img style="height:61.6vh;" src="../assets/harambetrophy.png"></v-img>
    </v-card>
  </v-col>
          <v-col md="4">
            <v-card dark>
              <v-card-title>Player Info</v-card-title>
              <v-select v-model="selectedSeason2" :items="seasons2" label="Select a season" item-text="name" item-value="year" outlined dense style="width:7vw" ></v-select>
              <v-data-table :headers="headers2" :items="players" :items-per-page="12"  class="elevation-1" ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    
  </template>
  <script>
  import espnService from '../services/EspnService.js'
  export default {
    name:'teams-display',
   data(){
    return{
      headers:[
       {text:'Team Name', value:'teamName'},
       {text:'Record', value:'record'},
       {text:'Points For', value:'pointsFor'},
       {text:'Points Against', value:'pointsAgainst'},
      ],
      headers2:[
        {text:'Player Name', value:'playerName'},
        {text:'Average Score', value:'averageScore'},
        {text:'Total Points', value:'totalPoints'},
      ],
      teams:[],
      isLoading:true,
      selectedSeason:2022,
      selectedSeason2:2021,
      seasons:[
        {name:'2020', year:2020},
        {name:'2021', year:2021},
        {name:'2022', year:2022}
      ],
      seasons2:[
        {name:'2020', year:2020},
        {name:'2021', year:2021},
        
      ],
      players:[]
    }
   },
  
   computed:{
    
   },
  
   created(){
   setTimeout(()=>{
    this.isLoading=false
   },1000)

    espnService.getTeams(this.selectedSeason,1136454).then(response=>{
      this.teams=response.data.teams.map(team=>{
        return{
          teamName: team.location+' '+team.nickname,
          record:team.record.overall.wins+'-'+team.record.overall.losses+'-'+team.record.overall.ties,
          pointsFor:team.record.overall.pointsFor.toFixed(2),
          pointsAgainst:team.record.overall.pointsAgainst.toFixed(2),
        }
      }) 
      .sort((a, b) => b.pointsFor - a.pointsFor);
    });
   espnService.getPlayers(this.selectedSeason2, 1136454, 10000).then(response => {
     this.players = response.data.players
      .map(player => {
        return {
         playerName: player.player.fullName,
         averageScore: player.player.stats.find(stat => stat.statSplitTypeId == 0).appliedAverage.toFixed(2),
         totalPoints: player.player.stats.find(stat => stat.statSplitTypeId == 0).appliedTotal.toFixed(2),
       }
     })
     .sort((a, b) => b.averageScore - a.averageScore);
  });
},
   watch:{
    selectedSeason(){
      espnService.getTeams(this.selectedSeason,1136454).then(response=>{
      this.teams=response.data.teams.map(team=>{
        return{
          teamName: team.location+' '+team.nickname,
          record:team.record.overall.wins+'-'+team.record.overall.losses+'-'+team.record.overall.ties,
          pointsFor:team.record.overall.pointsFor.toFixed(2),
          pointsAgainst:team.record.overall.pointsAgainst.toFixed(2),
        }
      })
      .sort((a, b) => b.pointsFor - a.pointsFor);
    });
    },
    selectedSeason2(){
      espnService.getPlayers(this.selectedSeason2, 1136454, 10000).then(response => {
  this.players = response.data.players
    .map(player => {
      return {
        playerName: player.player.fullName,
        averageScore: player.player.stats.find(stat => stat.statSplitTypeId == 0).appliedAverage.toFixed(2),
        totalPoints: player.player.stats.find(stat => stat.statSplitTypeId == 0).appliedTotal.toFixed(2),
      }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);
});
    }
   },
   methods:{
    
   },
  }
  
  
  
  </script>
  
  <style scoped>

 img{
  display: block;
  margin:0 auto;
  padding-top: 10vh;
  border-radius:70%;
 }
 
  
  </style>