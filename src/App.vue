<template>
  <header>
    <div class="header container">
      <a href="/" class="header__logo">
        <img alt="DanteStamp logo" src="@/assets/logo.svg" width="231" loading="lazy" />
      </a>
      <nav>
        <a href="https://www.facebook.com/dantestamp" title="Facebook page">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
        </a>
        <a href="https://www.instagram.com/dantestamp" title="Instagram page">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
        </a>
        <a href="https://twitter.com/DanteStamp" title="X (Twitter) page">
          <svg width="24" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4635 0.436049H21.9094L14.3812 9.04022L23.2375 20.7485H16.3021L10.8708 13.6475L4.65625 20.7485H1.20833L9.26042 11.5454L0.765625 0.436049H7.875L12.7844 6.92667L18.4615 0.436049H18.4635ZM17.2542 18.686H19.1635L6.83854 2.39022H4.78958L17.2542 18.686Z" fill="black"/>
          </svg>
        </a>
        <a href="mailto:dantestampart@gmail.com" title="Enviar email">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        </a>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>
    <div class="container">© {{new Date().getFullYear()}} DanteStamp</div>
  </footer>

  <div class="sl-toast-stack">
    <sl-alert id="successToast" variant="success" closable>
      <sl-icon slot="icon" name="check"></sl-icon>
      Obrigado pela compra.<br>Irá receber um email com as instruções de pagamento.
    </sl-alert>
  </div>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

watch(route, (r) => {

  if (r.query.alert === 'success') {
    const successToast = document.getElementById('successToast')
    if (successToast) {
      document.getElementById('successToast').toast() // show success toast
      router.replace({query: {}}) // clear router params
    }
  }
})

</script>

<style scoped>
header {
  position: relative;
  box-shadow: 0 0 .5rem rgba(0,0,0,0.2);
}
.header {
  display: flex;
  justify-content: space-between;
  gap: var(--sl-spacing-large);
}

.header__logo {
  display: flex;
  align-items: center;
  width: 14rem;
}

nav {
  --padding: var(--sl-spacing-small);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: calc(var(--padding) * -1);
  font-size: var(--sl-font-size-medium);
  font-weight: 700;
}
nav :is(a, button) {
  text-decoration: none;
  color: var(--sl-color-neutral-950);
}
nav a {
  padding: var(--padding);
}
nav svg {
  display: block;
}
.router-link-exact-active {
  text-decoration: underline;
}
@media (max-width: 600px) {
  .header__logo {
    width: 12rem;
  }
  nav {
    --padding: var(--sl-spacing-x-small);
  }
  nav svg {
    width: 1.2rem;
  }
}

footer {
  background-color: var(--sl-color-neutral-800);
  color: #FFF;
  text-align: center;
  font-size: var(--sl-font-size-small);
}
</style>
