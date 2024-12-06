<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title">Charts</h3>
        <!-- Render a canvas for each chart -->
        <div v-for="(chart, index) in chartData" :key="index" class="chart-container">
          <h4>{{ chart.label }}</h4>
          <canvas :id="`chartCanvas-${index}`"></canvas>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { Chart } from "chart.js";

export default {
  name: "ChartModal",
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    let chartInstances = [];

    const createCharts = () => {
      props.chartData.forEach((chart, index) => {
        const ctx = document.getElementById(`chartCanvas-${index}`).getContext("2d");
        const data = {
          labels: chart.data.map((entry) => entry.time),
          datasets: [
            {
              label: chart.label,
              data: chart.data.map((entry) => entry.value),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "hour",
              },
            },
          },
        };

        chartInstances[index] = new Chart(ctx, {
          type: "line",
          data,
          options,
        });
      });
    };

    const destroyCharts = () => {
      chartInstances.forEach((chart) => chart.destroy());
    };

    const closeModal = () => {
      destroyCharts();
      emit("close");
    };

    onMounted(() => {
      createCharts();
    });

    onUnmounted(() => {
      destroyCharts();
    });

    return {
      closeModal,
    };
  },
};
</script>

<style scoped>
.chart-container {
  margin-bottom: 2rem;
}
.modal-content {
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
