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
            <b>{{ key }}:</b> {{ value }}
          </li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
.card-header-title {
  text-transform: capitalize;
}
</style>