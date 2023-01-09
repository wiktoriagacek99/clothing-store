<template>
  <div id="app">
    <SidebarMenu />
    <SmallScreen />
    <!-- !PAGE CONTENT! -->
    <div class="w3-main" style="margin-left: 250px">
      <div class="w3-hide-large" style="margin-top: 83px"></div>
      <Header />
      <router-view />
    </div>
    <NewsletterModal />
    <AddToCart />
  </div>
</template>

<script>
import SmallScreen from "./components/templates/SmallScreen";
import NewsletterModal from "./components/additional/NewsletterModal";
import SidebarMenu from "./components/templates/SidebarMenu";
import Header from "./components/templates/Header";
import AddToCart from "./components/additional/AddToCart";

export default {
  name: "Home",
  components: {
    AddToCart,
    Header,
    SidebarMenu,
    NewsletterModal,
    SmallScreen,
  },

  created() {
    this.$store.dispatch("getProducts");
    window.setInterval(() => {
      this.$store.dispatch("getProducts");
    }, 300000);
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_style.css";
</style>
