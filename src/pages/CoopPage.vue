<template>
  <div class="coop">
    <h1>Chicken Coop Air Quality</h1>
    <div v-if="isLoading">Loading charts...</div>
    <div v-if="!isLoading">
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
      fields: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/items/`);
        this.chartData = response.data.map(item =>
            JSON.parse(item.data.replace(/'/g, '"'))
        );
        console.log(this.chartData);
        if (this.chartData.length > 0) {
          this.fields = Object.keys(this.chartData[0]).filter((key) => key !== 'time');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>
