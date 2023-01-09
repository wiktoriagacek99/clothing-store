<template>
  <header class="w3-container w3-xlarge">
    <p class="w3-right">
      <router-link to="/cart" class="cart-icon"
        ><span class="count">{{ itemsCount }}</span>
        <i class="fa fa-shopping-cart w3-margin-right"></i
      ></router-link>
      <i class="fa fa-search"></i>
    </p>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    itemsCount() {
      return this.$store.getters.itemsCount;
    },
  },
};
</script>

<style scoped>
.cart-icon {
  position: relative;
}

.count {
  position: absolute;
  z-index: 2;
  background-color: red;
  color: white;
  font-size: 15px;
  height: 20px;
  width: 20px;
  text-align: center;
  bottom: 20px;
  right: 2px;
  border-radius: 50%;
}
</style>
