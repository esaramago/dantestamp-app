<template>
  <div class="intro">
    <div class="container intro__container">

      <div class="intro__stamp">
        <img src="@/assets/postagestamp.svg" alt="Dante" loading="lazy">
        <div class="intro__image">
          <img src="@/assets/dante.png" alt="Dante" loading="lazy">
        </div>
      </div>

      <div class="intro__content">
        <div>
          <h1>DanteStamp</h1>
          <h2>Arte com selos</h2>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi molestiae tempore minus deserunt facilis pariatur tempora. Numquam possimus accusantium, alias adipisci nobis nesciunt ab quo accusamus placeat corrupti neque fuga!</p>
        <div class="g-row">
          <sl-button variant="primary" size="large" @click="scrollTo">Loja</sl-button>
          <sl-button variant="primary" size="large">Personalizar</sl-button>
        </div>
      </div>
    </div>

  </div>
  <main class="container stack">
    <h2 class="h-1" id="store">Loja</h2>

    <div class="store">
      <!--<div class="store__filters stack stack--small">
        <h3 class="h-4">Filtros</h3>
        <form>
          <fieldset>
            <legend>Temas</legend>
            <div class="checkbox-group">
              <sl-checkbox checked>Mapas</sl-checkbox>
              <sl-checkbox checked>Natureza</sl-checkbox>
              <sl-checkbox checked>Pessoas</sl-checkbox>
            </div>
          </fieldset>
          <fieldset>
            <legend>Disponibilidade</legend>
            <div class="checkbox-group">
              <sl-checkbox checked>Mostrar vendidos</sl-checkbox>
            </div>
          </fieldset>
        </form>
      </div>-->
      <div class="store__products">
        <Product
          v-for="product of products"
          :key="product.id"
          :id="product.id"
          :image-url="product.thumbnailUrl"
          :name="product.title"
          :price="product.price"
          :width="product.width"
          :height="product.height"
        ></Product>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import '@shoelace-style/shoelace/dist/components/button/button.js'
  import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
  import Product from '@/components/Product.vue'
  import { useFetchApi } from '@/composables/fetchApi'

  const products = ref([])
  const Products = (function() {

    async function getImages() {
      return await useFetchApi({
        endpoint: ''
      })
    }

    async function getProducts() {
      const result = await useFetchApi({
        endpoint: 'products?populate=*'
      })

      const productsData = result.data.map(product => {

        return {
          id: product.id,
          title: product.attributes.title,
          price: product.attributes.price,
          width: product.attributes.width,
          height: product.attributes.height,
          thumbnailUrl: product.attributes.thumbnail ? product.attributes.thumbnail.data.attributes.url : '',
        }
      })

      products.value = productsData

    }

    return {
      get: getProducts,
      getImages,
    }

  })()

  function scrollTo() {
    document.getElementById('store').scrollIntoView({ behavior: 'smooth' })
  }

  Products.get()
</script>

<style>
.intro {
  background-color: var(--sl-color-secondary-100);
}
.intro__container {
  align-items: center;
  gap: var(--sl-spacing-4x-large);
}
@media (min-width: 900px) {
  .intro__container {
    display: flex;
  }
}


.intro__stamp {
  max-width: 30rem;
  position: relative;
  margin: auto;
  aspect-ratio: 1/1;
}
.intro__image {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 83%;
  margin: auto;
  background-color: #FFFFFFCC;
  aspect-ratio: 1/1;
}
.intro__image > img {
  position: absolute;
  top: 5%;
  width: 80%;
  margin: auto;
  left: 0;
  right: 0;
}
.intro__stamp > img {
  position: relative;
  z-index: 1;
  opacity: .8;
}
@media (max-width: 900px) {
  .intro__stamp {
    max-width: 20rem;
  }
}


.intro__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sl-spacing-2x-large);
  text-align: center;
}
.intro__content h1 {
  font-size: 5rem;
}
.intro__content :is(h1, h2) {
  font-weight: 400;
}
.intro__content h1::after {
  content: "";
  margin-top: -3px;
  display: block;
  height: 2px;
  background-color: var(--sl-color-neutral-950);
}
.intro__content h2 {
  margin-top: .5rem;
  font-size: 5rem;
  font-size: var(--sl-font-size-large);
}
.intro__content p {
  font-size: var(--sl-font-size-medium);
  max-width: 34rem;
}
@media (max-width: 900px) {
  .intro__content h1 {
    font-size: 15vw;
  }
}

.store {
  display: flex;
  gap: var(--sl-spacing-4x-large);
}
.store__filters form {
  display: flex;
  flex-direction: column;
  gap: var(--sl-spacing-x-large);
}
.store__products {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-template-rows: min-content;
  gap: var(--sl-spacing-3x-large);
}
@media (max-width: 900px) {
  .store {
    flex-direction: column;
  }
}
@media (min-width: 600px) and (max-width: 900px) {
  .store__filters form {
    flex-direction: row;
    gap: var(--sl-spacing-3x-large);
  }
}
</style>