import { createApp } from "../../vue/vue.esm-browser.min.js";
import { $http, path } from "../api/config.js";

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await $http.post(path.signin, this.user);
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )};path=/`;
        location.href = "product.html";
      } catch (err) {
        console.error(err);
        alert(err.response.data.message);
      }
    },
  },
});

app.mount("#app");
