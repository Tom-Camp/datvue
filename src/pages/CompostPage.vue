
<template>
  <div class="coop">
    <h1>Chicken Coop Air Quality</h1>
    <div v-if="isLoading">Loading charts...</div>
    <div>
      <ChartComponent
        v-for="field in fields"
        :key="field"
        :chartData="chartData"
        :field="field"
      />
    </div>
  </div>
</template>

<script>
import ChartComponent from '../components/ChartComponent.vue'
import axios from "axios";

export default {
  name: 'Coop',
  components: {
    ChartComponent,
  },
  data() {
    return {
      chartData: [],
      fields: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/items/`);
        const { data } = response.data;
        this.chartData = data;
        console.log("loading data")
        console.log(this.chartData)
        if (response.l > 0) {
          this.fields = Object.keys(response[0]).filter((key) => key !== 'time');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
}
</script>
