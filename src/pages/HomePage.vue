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
    setup() {
    const showModal = ref(false);
    let chartInstance = null;

    // Create the chart when modal opens
    const createChart = () => {
      const ctx = document.getElementById("chartCanvas").getContext("2d");
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart if it already exists to prevent duplicates
      }
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Sample Data",
              data: [12, 19, 3, 5, 2],
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    // Watch the modal visibility and load the chart when opened
    const closeModal = () => {
      showModal.value = false;
    };

    return {
      showModal,
      createChart,
      closeModal,
    };
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
  watch: {
    showModal(newValue) {
      if (newValue) {
        this.createChart();
      }
    },
  },
}
</script>