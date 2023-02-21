import axios from 'axios';

const http=axios.create({
    baseURL:"https://fantasy.espn.com/apis/v3/games/ffl/seasons"
});

export default{

    getTeams(season,leagueId){
        return http.get(`/${season}/segments/0/leagues/${leagueId}?view=mTeam`)
    },

    getTeam(season,leagueId, teamId){
        return http.get(`/${season}/segments/0/leagues/${leagueId}/teams/${teamId}?view=mTeam`);
    },

    getPlayers(season, leagueId) {
        const config = {
          headers: {
            'x-fantasy-filter': JSON.stringify({
              players: {
                limit: 1500,
                sortDraftRanks: {
                  sortPriority: 100,
                  sortAsc: true,
                  value: 'STANDARD'
                }
              }
            })
          }
        };
        return http.get(`/${season}/segments/0/leagues/${leagueId}?view=kona_player_info`, config);
      },
    
    getPlayer(season,playerId){
        return http.get(`${season}/players/${playerId}`);
    },
    
}