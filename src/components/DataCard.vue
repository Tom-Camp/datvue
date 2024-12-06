<template>
  <div class="card m-2 column">
    <header class="card-header">
      <p class="card-header-title is-size-3 mb-1">{{ title }}</p>
      <span class="icon mt-3 mr-2">
        <i class="fa-solid fa-chart-simple is-size-4"></i>
      </span>
    </header>
    <div class="card-content">
      <div class="content">
        <ul>
          <li v-for="(value, key) in data" :key="key" class="is-size-4">
            <b>{{ key }}:</b> {{ value }}<span>{{ getExtraValue(key) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item is-size-4 is" @click.prevent="showModal = true">View Data</a>
    </footer>
  </div>

  <ChartModal
    v-if="isModalVisible"
    @close="closeModal"
    :chart-data="chartData"
  />
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ChartModal from "./ChartModal.vue";

export default {
  name: 'DataCard',
  components: {
    ChartModal,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: {}
    }
  },
  setup() {
    const isModalVisible = ref(false);
    const chartData = ref([]);

    const parseChartData = (responseData) => {
      const metrics = ["pressure", "air_temp", "air_humidity"];
      const timeSeries = responseData.map((entry) => ({
        time: entry.data.time,
        ...entry.data,
      }));

      return metrics.map((metric) => ({
        label: metric.replace("_", " ").toUpperCase(), // e.g., "pressure" -> "PRESSURE"
        key: metric,
        data: timeSeries.map((entry) => ({
          time: entry.time,
          value: entry[metric],
        })),
      }));
    }

    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await axios.get(`${apiUrl}/items/latest/`);
        chartData.value = parseChartData(response.data);
        isModalVisible.value = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    return {
      isModalVisible,
      chartData,
      openModal,
      closeModal,
    };
  },
  methods: {
    getExtraValue(key) {
      const extraValues = {
        "pressure": " hPa",
        "air_humidity": "%",
        "humidity": "%",
        "air_temp": "°F",
        "temp": "°F",
        "gas": " Ohms",
      };
      return extraValues[key] || "";
    },
  },
}
</script>

<style scoped>
.card-header-title {
  text-transform: capitalize;
}
</style>