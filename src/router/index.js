import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../components/additional/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../components/additional/Checkout.vue"),
  },
  {
    path: "/summary",
    name: "Summary",
    component: () => import("../components/additional/Summary.vue"),
    beforeEnter: (to, from, next) => {
      console.log(Store.state.data);
      if (Store.state.data.validated) next();
      else next({ name: "PageNotFound" });
    },
  },

  {
    path: "/products/:id",
    name: "View",
    component: () => import("../components/additional/ProductCard.vue"),
    beforeEnter: (to, from, next) => {
      const product = Store.state.products.find(
        (product) => product.id == to.params.id
      );
      if (product) next();
      else next({ name: "PageNotFound" });
    },
  },

  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../components/additional/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
