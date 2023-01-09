<template>
  <div class="cart">
    <h1>Shopping Cart</h1>

    <div v-if="this.$store.getters.itemsCount != 0">
      <div class="row">
        <div class="image title">Image</div>
        <div class="description title">Title</div>
        <div class="price title">Price</div>
        <div class="quantity title">Quantity</div>
        <div class="total title">Total</div>
        <div class="remove title">Remove</div>
      </div>

      <div v-for="item in cart" :key="item.product.id">
        <hr />
        <div class="row row-item">
          <div
            class="image item"
            v-bind:style="{
              'background-image': ' url(' + item.product.image + ')',
            }"
          ></div>
          <div class="description item">
            <router-link :to="`/products/${item.product.id}`">
              {{ item.product.product_name }}
            </router-link>
          </div>
          <div class="price item">
            {{ item.product.price }}
          </div>
          <div class="quantity item">
            <button
              @click="
                () => {
                  if (item.quantity === 1) {
                    item.quantity === 1;
                  } else {
                    item.quantity--;
                  }
                }
              "
            >
              &mdash;
            </button>
            <input
              type="text"
              :value="item.quantity"
              readonly
              class="quantity-input"
            />
            <button @click="item.quantity++">&#xff0b;</button>
          </div>
          <div class="total item">
            $
            {{
              (
                item.quantity * parseFloat(item.product.price.slice(1, -1))
              ).toFixed(2)
            }}
          </div>
          <div class="remove item">
            <i
              class="fa fa-remove"
              @click.prevent="removeProduct(item.product)"
            ></i>
          </div>
        </div>
      </div>

      <div class="checkout">
        <div class="subtotal">Total: $ {{ totalPrice.toFixed(2) }}</div>
        <div class="shipping">Shipping: $ 12.30</div>
        <router-link to="/checkout" class="button">Checkout</router-link>
      </div>
    </div>
    <div class="not-found" v-if="this.$store.getters.itemsCount == 0">
      The shopping cart is empty
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  methods: {
    removeProduct(product) {
      this.$store.dispatch("removeProduct", product);
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 20px;
}
.row {
  display: flex;
  flex-direction: row;
  text-align: center;
  font-size: 22px;
}

.image,
.price,
.quantity,
.total,
.remove {
  padding: 10px;
  flex: 13%;
}

.description {
  padding: 10px;
  flex: 35%;
}

.description a {
  text-decoration: none;
}

.remove i {
  cursor: pointer;
}

.item {
  font-size: 12px;
  padding: 35px 10px;
}

.image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: grayscale(75%);
  border-radius: 5%;
}

.title {
  filter: grayscale(75%);
}
.row-item {
  margin-bottom: 20px;
}

.checkout {
  text-align: right;
}

.quantity-input {
  border: 0;
  width: 2.5rem;
  text-align: center;
  padding: 0 0.5rem;
}

.quantity-input:focus {
  outline: none;
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
  margin: 20px auto;
}
.button:hover {
  color: #1f1d1d !important;
  background-color: white !important;
}

.not-found {
  font-size: 22px;
}
@media (max-width: 800px) {
  .item {
    font-size: 10px;
  }
}
</style>
