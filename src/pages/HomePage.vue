<template>
  <div class="content">
    <div class="columns">
      <DataCard
        :key="card.id"
        :title="card.key"
        :data="card.data"
      />
    </div>
  </div>
</template>

<script>
import DataCard from '../components/DataCard.vue'
import axios from "axios";

export default {
  name: 'HomePage',
  components: {
    DataCard
  },
  data() {
    return {
      card: {}
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_API_HOME_URL;
        const response = await axios.get(`${apiUrl}`, {
          withCredentials: true,
        });
        this.card = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 300000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
}
</script>