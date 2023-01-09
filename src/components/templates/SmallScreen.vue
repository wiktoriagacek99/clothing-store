<template>
  <div class="small-screens">
    <!-- Top menu on small screens -->
    <header class="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
      <router-link to="/"
        ><div class="w3-bar-item w3-padding-24 w3-wide">LOGO</div></router-link
      >
      <a
        href="javascript:void(0)"
        class="w3-bar-item w3-button w3-padding-24 w3-right"
        onclick="w3_open()"
        ><i class="fa fa-bars"></i
      ></a>
    </header>

    <!-- Overlay effect when opening sidebar on small screens -->
    <div
      class="w3-overlay w3-hide-large"
      onclick="w3_close()"
      style="cursor: pointer"
      title="close side menu"
      id="myOverlay"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Small-Screen",
};
</script>

<style scoped>
.w3-wide {
  text-decoration: none;
}
</style>
