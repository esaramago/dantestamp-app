<template>
  <main>
    <div class="container stack">
      <h1 class="h-1">Comprar</h1>
      <div class="g-row g-row--nowrap g-row--desktop g-row--reverse">
        <aside class="resume stack stack--small">
          <sl-card>
            <h2 class="h-2">Resumo da compra</h2>
            <Product
              :id="product.id"
              :image-url="product.thumbnailUrl"
              :name="product.title"
              :price="product.price"
              :width="product.width"
              :height="product.height"
              :show-button="false"
            ></Product>
            <div>
              Portes de envio
              <div class="price">0</div>
            </div>
            <div class="u-text-right">
              <span>Total: </span>
              <span class="price price--large">{{product.price}}</span>
            </div>
          </sl-card>
        </aside>
        <form id="form" @submit.prevent="onSubmit" class="g-col--full">
          <sl-card class="form">
            <h2 class="h-2">Envio</h2>
            <sl-input
              label="Nome"
              v-model="order.name"
              class="u-half--desktop"
              :required="true"
            ></sl-input>
            <sl-input
              label="Email"
              v-model="order.email"
              type="email"
              class="u-half--desktop"
              :required="true"
            ></sl-input>
            <sl-input
              label="Contacto telefónico"
              v-model="order.phone"
              type="tel"
              class="u-half--desktop"
            ></sl-input>

            <fieldset>
              <sl-radio-group
                label="País de envio"
                name="country"
                v-model="order.isPortugal"
                @sl-change="onChangeCountry"
                :required="true"
              >
                <sl-radio value="pt">Portugal</sl-radio>
                <sl-radio value="other">Outro</sl-radio>
              </sl-radio-group>
            </fieldset>
            <sl-input
              label="Morada"
              placeholder="Rua, porta, andar"
              v-model="order.address"
              :required="true"
            ></sl-input>

            <div class="g-row">
              <fieldset class="g-row g-row--small g-row--end">
                <legend class="label label--required">Código Postal</legend>
                <sl-input
                  class="zip-code-1"
                  v-model="order.zipCode.one"
                  inputmode="numeric"
                  maxlength="4"
                  :required="true"
                ></sl-input>
                <sl-input
                  class="zip-code-2"
                  v-model="order.zipCode.two"
                  inputmode="numeric"
                  maxlength="3"
                  :required="true"
                ></sl-input>
              </fieldset>
              <sl-input
                label="Localidade"
                v-model="order.zipCode.location"
                :required="true"
              ></sl-input>
            </div>

            <div slot="footer" class="g-row g-row--center">
              <p class="g-col--full">Ao comprar, receberá um email com as instruções de pagamento.</p>
              <sl-button variant="primary" type="submit">Comprar</sl-button>
            </div>
          </sl-card>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js'
import '@shoelace-style/shoelace/dist/components/radio/radio.js'
import Product from '@/components/Product.vue'
import { useFetchApi } from '@/composables/fetchApi'

const route = useRoute()
const router = useRouter()

const product = ref([])
const initProduct = (function() {

  const productId = route.query.id

  async function getProduct() {
    const data = await useFetchApi({
      endpoint: `products/${productId}?populate=*`
    })

    if (data) {

      product.value = {
        id: data.data.id,
        title: data.data.attributes.title,
        price: data.data.attributes.price,
        width: data.data.attributes.width,
        height: data.data.attributes.height,
        thumbnailUrl: data.data.attributes.thumbnail ? data.data.attributes.thumbnail.data.attributes.url : '',
      }
    }

  }
  return {
    get: getProduct
  }
})()

initProduct.get()

const order = reactive({
  name: '',
  email: '',
  isPortugal: true,
  address: '',
  zipCode: {
    one: null,
    two: null,
    location: '',
  }
})

const onChangeCountry = (e) => {
  order.isPortugal = e.currentTarget.value === 'pt'
}

const validate = () => {
  const isValid = document.getElementById('form').noValidate
  return isValid
}

const onSubmit = async () => {

  const request = {
    name: order.name,
    email: order.email,
    phone: order.phone,
    isPortugal: order.isPortugal,
    address: order.address,
    zipCode1: order.zipCode.one,
    zipCode2: order.zipCode.two,
    location: order.zipCode.location,
    productId: product.value.id,
  }

  if (validate(request)) {

    await useFetchApi({
      endpoint: `orders`,
      method: 'POST',
      request,
    })

    router.push('/')

  }
}

</script>

<style scoped>
main {
  background-color: var(--sl-color-neutral-100);
}
.form {
  display: block;
}
.form::part(body) {
  display: block;
  display: flex;
  flex-direction: column;
  gap: var(--sl-spacing-medium);
}
.zip-code-1::part(base) {
  max-width: 5rem;
}
.zip-code-2::part(base) {
  max-width: 4rem;
}
.zip-code-1::part(input),
.zip-code-2::part(input) {
  text-align: center;
}

.resume > sl-card > * + *:not(:nth-child(1)) {
  margin-top: var(--sl-spacing-small);
}
.resume > sl-card > * + *:not(:nth-child(2)) {
  padding-top: var(--sl-spacing-small);
  border-top: 1px solid var(--border-color);
}

@media (min-width: 500px) and (max-width: 900px) {
  .product::part(base) {
    flex-direction: row;
  }
}
@media (min-width: 500px) and (max-width: 900px) {
  .product::part(image) {
    width: 40%;
    max-width: 22rem;
  }
}

@media (min-width: 901px) {
  .resume {
    max-width: 15rem;
  }
}
</style>