<template>
  <div class="home">
    <TopLevel />
    <Products />
    <SubscribeSection />
    <Footer />
  </div>
</template>

<script>
import SubscribeSection from "../components/additional/SubscribeSection";
import TopLevel from "../components/templates/TopLevel";
import Products from "../components/templates/ProductsList";
import Footer from "../components/templates/Footer";
export default {
  name: "Home",
  components: {
    Footer,
    Products,
    TopLevel,
    SubscribeSection,
  },
};
</script>
