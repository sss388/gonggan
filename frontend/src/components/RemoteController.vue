<template>
  <div>
       <div class="button-container">
      <button @click="goToTop" class="go-to-top-button">
        <arrow-small-up-icon class="w-6 h-6" aria-hidden="true" />
      </button>
<!--      <p class="button-text">맨위로</p>-->
      <div class="shopping-cart-button" >
        <router-link to="/cart">
          <shopping-cart-icon class="h-6 w-6" aria-hidden="true" />
        </router-link>
      </div>
<!--      <p class="button-text">장바구니</p>-->
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowSmallUpIcon } from "@heroicons/vue/24/outline";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
export default {
  name: "RemoteController",
  components: {
    ArrowSmallUpIcon,
    ShoppingCartIcon,
  },
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

  },
};
</script>

<style scoped>
.remote-controller-content {
  @apply flex justify-center items-center text-2xl min-h-screen;
}

.button-container {
  @apply flex flex-col p-5 bg-white rounded-tr-none rounded-br-none;
  @apply rounded-tl-md rounded-bl-md fixed bottom-5 right-5 z-50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.12);
}

.go-to-top-button,
.shopping-cart-button {
  @apply inline-block bg-white border-none text-black cursor-pointer text-lg;
  @apply py-5 px-7;
  @apply rounded-full;
}

.button-text {
  @apply text-center mt-1;
}

.shopping-cart-button {
  @apply mt-2;
}

.go-to-top-button:hover,
.shopping-cart-button:hover {
  @apply bg-gray-300;
}
</style>
