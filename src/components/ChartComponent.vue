<template>
  <h1>chart</h1>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
      <!-- Modal -->
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <canvas id="chartCanvas"></canvas>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';

Chart.register(...registerables);

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      const labels = this.chartData.map((item) => item.time); // x-axis: time
      const dataset = this.chartData.map((item) => item[this.field]); // y-axis: field values

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: this.field,
              data: dataset,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                parser: 'YYYY-MM-DD HH:mm',
                tooltipFormat: 'll HH:mm',
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: this.field,
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
