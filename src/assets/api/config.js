import "../helpers/axios.min.js";
const baseURL = "https://vue3-course-api.hexschool.io/v2";
// const base = "https://ec-course-api.hexschool.io/v2";
// const path = "​/v2​/admin​/signin";
const api_path = "gingene-test";

const path = {
  signin: "/admin/signin",
  logout: "/logout",
  check: "/api/user/check",
  admin: `/api/${api_path}/admin`,
  guest: `/api/${api_path}`,
};

const $http = axios.create({
  baseURL,
});

export { $http, path };
