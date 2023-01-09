<template>
  <div>
    <h1>{{ data.name }}, Thank You For Your Purchase!</h1>
    <div class="summary">
      <div class="left-side">
        <div class="header">Shipping Info</div>
        <div class="info">
          <h5>{{ data.name }} {{ data.lastname }}</h5>
          <h5 v-if="data.isCompany === true">
            {{ data.company }} <br />
            NIP: {{ data.nip }}
          </h5>

          <h5 v-if="data.isOtherAddress === true">
            {{ data.otherAddress }}, {{ data.otherPostCode }}
          </h5>
          <h5 v-else>{{ data.address }}, {{ data.postCode }}</h5>
        </div>
      </div>
      <div class="right-side">
        <div class="header">Billing Info</div>
        <div class="info">
          <h5>{{ data.payment }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summary.vue",
  computed: {
    data() {
      return this.$store.state.data;
    },
  },
};
</script>

<style scoped lang="scss">
.summary {
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  margin-top: 78px;

  .left-side {
    flex: 50%;
    padding: 20px;
    position: relative;
  }

  .right-side {
    flex: 50%;
    padding: 20px;
  }
  .header {
    padding: 20px 0;
    background-color: #1f1d1d;
    color: white;
    text-align: center;
    text-transform: uppercase;
    font-size: 26px;
  }
  .info {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
