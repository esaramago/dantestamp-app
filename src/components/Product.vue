<template>
  <sl-card class="product">
    <img slot="image" :src="`media/products/${props.slug}.jpg`" :alt="props.title" loading="lazy">
    <h4 class="name">
      <RouterLink :to="`/checkout?id=${props.id}`" title="Comprar">{{ props.title }}</RouterLink>
    </h4>
    <template v-if="props.width && props.height">{{props.width}} x {{props.height}} cm</template>
    <div>
      <Price v-if="props.price" :value="props.price"></Price>
    </div>
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
import Price from '@/components/Price.vue'

const props = defineProps({
  id: Number,
  slug: String,
  title: {
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
.product::part(body) {
  flex-grow: 1;
}
.product::part(footer) {
  border: none;
  padding-top: 0
}

.name {
  flex-grow: 1;
  font-size: var(--sl-font-size-medium);
  font-weight: 700;
}
.name a {
  text-decoration: none;
  color: inherit;
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
