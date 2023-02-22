<template>
   <div>
    <canvas ref="chart"></canvas>

</div>
  </template>
<script>
import ProfileService from '@/services/ProfileService';
import Chart from 'chart.js/auto';

export default {
    name:'leader-board',
 data(){
    return{
    allProfiles:[],
    chart:null,
   
 }
},

created(){
    ProfileService.getAllProfiles().then((response) => {
  this.allProfiles = response.data.sort((a, b) => b.karma - a.karma);
  this.$nextTick(() => {
      this.createChart();
    });
});

},
methods: {
  createChart(){
      const canvas = this.$refs.chart;
      const ctx = canvas.getContext('2d');
      const labels = this.allProfiles.map(profile => profile.displayName);
      const data = this.allProfiles.map(profile => profile.karma);
      const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
      this.cart=new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Profile Karma',
            data: data,
            backgroundColor: colors.slice(0, data.length),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio:50/70,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
    legend: {
      position: 'top',
    },
  },
  layout: {
    padding: {
      left: 50,
      right: 50,
      top: 0,
      bottom: 0,
    },
  },
  maxDimensions: {
    width: 800,
    height: 600,
  },
        },
      });
  }
  },
 
};
</script>

<style>

</style>