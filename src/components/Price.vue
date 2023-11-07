<template>
  <span class="price" :class="`price--${props.size}`">
    <span class="price__currency">€ </span>{{ props.value }}
  </span>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: value => {
      return value.includes('md', 'lg')
    },
  }
})
</script>

<style scoped>
.price {
  font-weight: 700;
  font-size: var(--sl-font-size-large);
  color: var(--sl-color-primary-600);
}
.price__currency {
  font-size: var(--sl-font-size-medium);
}
.price--lg {
  font-size: var(--sl-font-size-x-large);
  line-height: .8;
}
</style>