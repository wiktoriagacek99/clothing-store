<template>
  <div>
    <div class="product" v-if="product">
      <div class="left-side">
        <div
          class="img"
          v-bind:style="{ 'background-image': ' url(' + product.image + ')' }"
        ></div>
        <p class="company">
          Company: <strong>{{ product.company }}</strong>
        </p>
        <button @click="addToCart()" class="button">
          Buy now <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
      <div class="right-side">
        <h1>{{ product.product_name }}</h1>
        <h4>
          {{ product.price }}
        </h4>
        <p class="short-description">
          {{ product.short_description }}
        </p>
        <hr />
        <p class="description">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  computed: {
    product() {
      return this.$store.state.products.find(
        (product) => product.id == this.$route.params.id
      );
    },
  },
  methods: {
    addToCart() {
      document.getElementById("addtocart").style.display = "block";

      this.$store.dispatch("addProductToCart", {
        product: this.product,
        quantity: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  margin-top: 78px;

  .left-side {
    flex: 30%;
    padding: 20px;
    position: relative;
  }

  .right-side {
    flex: 70%;
    background-color: white;
    padding: 0 20px;
  }

  .img {
    height: 300px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 20px;
    margin-bottom: 20px;
    filter: grayscale(75%);
  }

  .short-description {
    text-align: justify;
    color: #606060;
    font-style: italic;
    font-size: 13px;
    padding-bottom: 15px;
  }
  .description {
    text-align: justify;
    padding-top: 15px;
  }
  .company {
    text-align: center;
  }
}
.button {
  text-align: center;
  background-color: #1f1d1d !important;
  color: white !important;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  padding: 7px 15px;
  text-decoration: none;
  height: 40px;
  display: inline-block;
  margin-top: 20px;
  width: 100%;
}
.button:hover {
  color: #1f1d1d !important;
  background-color: white !important;
}

@media screen and (max-width: 700px) {
  .product {
    flex-direction: column;
  }
}
</style>
