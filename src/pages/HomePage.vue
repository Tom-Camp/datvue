<template>
  <div class="content">
    <div class="columns">
      <DataCard
        v-for="card in cards"
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
      cards: []
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/items/latest/`);
        this.cards = response.data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>