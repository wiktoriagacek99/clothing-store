<template>
  <div id="addtocart" class="page">
    <div class="label">
      <i
        onclick="document.getElementById('addtocart').style.display='none'"
        class="fa fa-remove remove"
      ></i>
      <h1>Product added to shopping bag!</h1>

      <button
        class="button"
        onclick="document.getElementById('addtocart').style.display='none'"
      >
        Continue shopping
      </button>
      <router-link
        class="button"
        to="/cart"
        onclick="document.getElementById('addtocart').style.display='none'"
        >Shopping bag</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
};
</script>

<style scoped>
.page {
  z-index: 3;
  display: none;
  padding-top: 100px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.label {
  margin: auto;
  position: relative;
  background: white;
  width: 850px;
  padding: 35px;
  animation: animatezoom 0.5s;
  text-align: center;
}

.label h1 {
  margin-bottom: 35px;
}
.remove {
  font-size: 40px;
  font-weight: lighter;
  position: absolute;
  right: 30px;
  cursor: pointer;
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
  margin: 0 10px;
  display: inline-block;
}
.button:hover {
  color: #1f1d1d !important;
  background-color: white !important;
}
</style>
