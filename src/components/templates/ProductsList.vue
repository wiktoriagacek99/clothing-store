<template>
  <div class="w3-row w3-grayscale">
    <div
      class="products-list"
      v-for="product in products"
      v-bind:key="product.id"
    >
      <div class="w3-col l3 s6">
        <div class="w3-container">
          <div class="w3-display-container">
            <img :src="product.image" style="width: 100%" alt="image" />
            <span class="w3-tag w3-display-topleft">New</span>
            <div class="w3-display-middle w3-display-hover">
              <button @click="addToCart(product.id)" class="w3-button w3-black">
                Buy now <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <p class="title">
            <router-link :to="`/products/${product.id}`">
              {{ product.product_name }}
            </router-link>
            <br />
            <b>{{ product.price }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  methods: {
    addToCart(id) {
      document.getElementById("addtocart").style.display = "block";
      const product = this.$store.state.products.find(
        (product) => product.id == id
      );
      this.$store.dispatch("addProductToCart", {
        product: product,
        quantity: 1,
      });
    },
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style scoped>
.w3-display-container {
  display: block;
  height: 100%;
  width: 100%;
}
.title a {
  font-size: 14px;
  text-decoration: none;
}
</style>
