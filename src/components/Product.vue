<template>
  <sl-card class="product" :class="{'--has-image': props.imageUrl}">
    <img slot="image" v-if="props.imageUrl" :src="`${mediaUrl}${props.imageUrl}`" :alt="props.name" loading="lazy">
    <img slot="image" v-else src="@/assets/dante.png" alt="DanteStamp" loading="lazy">
    <h4 class="name">{{ props.name }}</h4>
    <template v-if="props.width && props.height">{{props.width}} x {{props.height}} cm</template>
    <div class="price" v-if="props.price">{{props.price}}</div>
    <div slot="footer" class="u-text-right" v-if="props.showButton">
      <RouterLink :to="`/checkout?id=${props.id}`">
        <sl-button variant="primary">Comprar</sl-button>
      </RouterLink>
    </div>
  </sl-card>
</template>

<script setup>
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'

const mediaUrl = import.meta.env.VITE_MEDIA_URL

const props = defineProps({
  id: Number | String,
  imageUrl: String,
  name: {
    type: String,
    default: 'Sem título'
  },
  width: Number,
  height: Number,
  price: Number,
  isAvailable: Boolean,
  showButton: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
sl-card .product::part(base) {
  border: none;
  gap: var(--sl-spacing-medium);
}
sl-card .product::part(body) {
  padding: 0;
}
.product {
  max-width: 25rem;
}
.product::part(base) {
  height: 100%;
}
.product:not(.--has-image)::part(image) {
  background-color: var(--sl-color-secondary-100);
}
.product:not(.--has-image) img {
  position: relative;
  opacity: .2;
  filter: grayscale(1);
}
.product::part(body) {
  flex-grow: 1;
}
.name {
  flex-grow: 1;
  font-size: var(--sl-font-size-large);
  font-weight: 700;
  line-height: 1;
}
sl-card::part(footer) {
  text-align: right;
}
</style>
