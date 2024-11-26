<template>
  <div class="column">
    <!-- Wrap entire card in a router-link or anchor tag -->
    <router-link :to="link" class="card-link">
      <div class="card has-background-white-ter">
        <div class="card-image">
          <figure class="image">
            <img :src="imageUrl" :alt="title">
          </figure>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.card-link {
  color: inherit;
  text-decoration: none;
}

.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}
</style>
