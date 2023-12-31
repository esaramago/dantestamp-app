<template>
  <main>
    <div class="container stack">
      <Back to="/">
        <template v-if="product.isAvailable">Comprar</template>
        <template v-else>Encomendar</template>
      </Back>
      <div class="g-row g-row--nowrap g-row--desktop g-row--reverse">
        <aside class="resume stack stack--small">
          <sl-card>
            <h2 class="h-2 is-visually-hidden">Resumo da <template v-if="product.isAvailable">compra</template><template v-else>encomenda</template></h2>
            <Product
              :id="product.id"
              :slug="product.slug"
              :title="product.title"
              :price="product.price"
              :width="product.width"
              :height="product.height"
              :is-available="product.isAvailable"
              :show-button="false"
            ></Product>
            <div>
              Portes de envio
              <Price :value="0"></Price>
            </div>
            <div class="u-text-right">
              <span>Total: </span>
              <Price size="lg" :value="product.price"></Price>
            </div>
          </sl-card>
        </aside>
        <form id="form" @submit.prevent="onSubmit">
          <sl-card class="form">
            <h2 class="h-2">Dados de envio</h2>
            <div class="g-row">
              <sl-input
                label="Nome"
                v-model="order.name"
                :required="true"
              ></sl-input>
              <sl-input
                label="Contacto telefónico"
                v-model="order.phone"
                type="tel"
              ></sl-input>
            </div>

            <!-- <div class="g-row">
              <sl-input
                label="Email"
                v-model="order.email"
                type="email"
                :required="true"
              ></sl-input>
            </div> -->

            <fieldset>
              <sl-radio-group
                label="País de envio"
                name="country"
                v-model="order.country"
                @sl-change="onChangeCountry"
                :required="true"
              >
                <sl-radio value="pt">Portugal</sl-radio>
                <sl-radio value="other" disabled>Outro</sl-radio>
              </sl-radio-group>
            </fieldset>
            <sl-input
              label="Morada"
              placeholder="Rua, porta, andar"
              v-model="order.address"
              :required="true"
            ></sl-input>

            <div class="g-row">
              <fieldset class="g-col--auto g-row g-row--small g-row--end">
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

            <sl-textarea id="message" label="Mensagem"></sl-textarea>

            <div slot="footer" class="g-row g-row--center g-row--nowrap">
              <p class="u-font-small" v-if="product.isAvailable">Ao comprar, receberá um email com as instruções de pagamento.</p>
              <p class="u-font-small" v-else>Esta obra não está disponível porque já foi vendida. Pode encomendar uma semelhante, feita só para si.</p>
              <sl-button
                class="g-col--auto"
                variant="primary"
                :href="`
                  mailto:dantestampart@gmail.com?subject=${product.isAvailable !== false ? 'Compra' : 'Encomenda'}&body=
                    Nome: ${order.name}%0D%0A
                    Telefone: ${order.phone}%0D%0A
                    Morada: ${order.address}, ${order.zipCode.one}-${order.zipCode.two} ${order.zipCode.location}%0D%0A
                    Mensagem: ${order.message}
                `"
              >
                <template v-if="product.isAvailable">Comprar</template>
                <template v-else>Encomendar</template>
              </sl-button>
            </div>
          </sl-card>
        </form>
      </div>
    </div>
  </main>

  <div class="sl-toast-stack">
    <sl-alert id="errorToast" variant="error" closable>
      <sl-icon slot="icon" name="check"></sl-icon>
      Não foi possível fazer a compra. Tente novamente, por favor.
    </sl-alert>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Product from '@/components/Product.vue'
import Back from '@/components/Back.vue'
import Price from '@/components/Price.vue'
import { useGetData } from '@/composables/getData'

const route = useRoute()
const router = useRouter()

const product = ref([])
const initProduct = (function() {

  const productId = route.query.id

  async function getProduct() {
    await useGetData({
      endpoint: `products/${productId}`,
      success: data => {
        product.value = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          price: data.price || null,
          width: data.width,
          height: data.height,
          isAvailable: data.isAvailable !== false
        }
      }
    })

  }
  return {
    get: getProduct
  }
})()

initProduct.get()

const order = reactive({
  name: '',
  email: '',
  phone: null,
  country: 'pt',
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

const onSubmit = async (e) => {

  const isFormValid = e.currentTarget.reportValidity()

  if (isFormValid) {

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

    await useGetData({
      endpoint: '',
      method: 'POST',
      request,
      success: () => {
        router.push(`/?alert=success`)
      },
      error: () => {
        document.getElementById('errorToast').toast()
      }
    })

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
    max-width: 20rem;
  }
}
</style>