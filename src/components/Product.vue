<template>
  <sl-card class="product" :class="{'--has-image': props.imageUrl}">
    <img slot="image" v-if="props.imageUrl" :src="`${mediaUrl}${props.imageUrl}`" :alt="props.name" loading="lazy">
    <img slot="image" v-else src="@/assets/dante.png" alt="DanteStamp" loading="lazy">
    <h4 class="name">
      <RouterLink :to="`/checkout?id=${props.id}`" title="Comprar">{{ props.name }}</RouterLink>
    </h4>
    <template v-if="props.width && props.height">{{props.width}} x {{props.height}} cm</template>
    <div class="price" v-if="props.price">{{props.price}}</div>
    <span class="not-available" v-if="!props.isAvailable">Não disponível</span>

    <div slot="footer" class="u-text-right" v-if="props.showButton">
      <RouterLink :to="`/checkout?id=${props.id}`">
        <sl-button variant="primary" v-if="props.isAvailable">Comprar</sl-button>
        <sl-button variant="secondary" v-else>Encomendar</sl-button>
      </RouterLink>
    </div>
  </sl-card>
</template>

<script setup>
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'

const mediaUrl = import.meta.env.VITE_MEDIA_URL

const props = defineProps({
  id: Number, String,
  imageUrl: String,
  name: {
    type: String,
    default: 'Sem título'
  },
  width: Number,
  height: Number,
  price: Number,
  isAvailable: {
    type: Boolean,
    default: true
  },
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
  --border-width: 0;
  border: 1px solid var(--border-color);
}
sl-card .product {
  border: none;
}
.product::part(base) {
  height: 100%;
}
.product:not(.--has-image)::part(image) {
  background-color: var(--sl-color-primary-50);
}
.product:not(.--has-image) img {
  position: relative;
  opacity: .2;
  filter: grayscale(1);
}
.product::part(body) {
  flex-grow: 1;
}
.product::part(footer) {
  border: none;
  padding-top: 0
}

.name {
  flex-grow: 1;
  font-size: var(--sl-font-size-large);
  font-weight: 700;
  line-height: 1;
}
.name a {
  text-decoration: none;
  color: var(--sl-color-neutral-900);
}
.name a:hover {
  text-decoration: underline;
}
.not-available {
  color: var(--sl-color-danger-500);
  font-weight: bold;
}
sl-card::part(footer) {
  text-align: right;
}
</style>
