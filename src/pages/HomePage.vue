<template>
  <div class="content">
    <div class="columns">
      <ImageCard
        v-for="card in cards"
        :key="card.id"
        :image-url="card.imageUrl"
        :title="card.title"
        :description="card.description"
        :link="card.link"
      />
    </div>
  </div>
</template>

<script>
import ImageCard from '../components/ImageCard.vue'
import CoopImage from '@/assets/coop.png'
import CompostImage from '@/assets/compost.png'

export default {
  name: 'HomePage',
  components: {
    ImageCard
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          imageUrl: CoopImage,
          title: 'Coop',
          description: 'Description for first card',
          link: '/coop'
        },
        {
          id: 2,
          imageUrl: CompostImage,
          title: 'Compost',
          description: 'Description for second card',
          link: '/compost'
        }
      ]
    }
  }
}
</script>