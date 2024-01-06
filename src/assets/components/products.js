import { createApp, onMounted, ref } from "../../vue/vue.esm-browser.min.js";
import { $http, path } from "../api/config.js";

const app = createApp({
  setup() {
    const products = ref([]);
    const tempProduct = ref({});
    const load = ref(null);

    // loading modal
    function loading(msg) {
      load.value.classList.remove("d-none");
      load.value.childNodes[0].childNodes[0].textContent = msg;
    }

    // 移除loading modal
    function removeloading() {
      load.value.classList.add("d-none");
    }

    // 選擇product時，將product資料存入tempProduct中，並將tempProduct傳入product.html中
    function findProduct(item) {
      tempProduct.value = item;
    }

    // 取得product資料，並將products傳入product.html中
    async function getProducts() {
      try {
        const res = await $http.get(`${path.admin}/products`);
        products.value = res.data.products;
        removeloading();
      } catch (err) {
        console.error(err);
      }
    }

    // 檢查是否為管理者，並取得product資料，並將products傳入product.html中
    async function checkAdmin() {
      loading("讀取資料中，請稍後");
      try {
        await $http.post(path.check);
        getProducts();
      } catch (err) {
        alert(err.response.data.message);
        location.href = "index.html";
      }
    }

    // 初始化頁面時，取得cookie中的token，並將token傳入$http.defaults.headers.common.Authorization中
    onMounted(() => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      $http.defaults.headers.common.Authorization = token;
      checkAdmin();
    });

    return {
      load,
      products,
      tempProduct,
      findProduct,
      getProducts,
      loading,
      removeloading,
    };
  },
});

app.mount("#app");
