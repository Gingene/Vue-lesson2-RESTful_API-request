import { createApp } from "../../vue/vue.esm-browser.min.js";
import { $http, path } from "../api/config.js";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    async checkAdmin() {
      this.loading("讀取資料中，請稍後");
      try {
        await $http.post(path.check);
        this.getProducts();
      } catch (err) {
        alert(err.response.data.message);
        location.href = "index.html";
      }
    },
    findProduct(item) {
      this.tempProduct = item;
    },
    async getProducts() {
      try {
        const res = await $http.get(`${path.admin}/products`);
        this.products = res.data.products;
        this.removeloading();
      } catch (err) {
        console.error(err);
      }
    },
    loading(msg) {
      this.$refs.load.classList.remove("d-none");
      this.$refs.load.childNodes[0].childNodes[0].textContent = msg;
    },
    removeloading() {
      this.$refs.load.classList.add("d-none");
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    $http.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
});

app.mount("#app");
