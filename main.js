if (location.pathname === "/" || location.pathname === "/index.html") {
  import("./src/assets/components/login.js");
} else if (location.pathname === "/product.html") {
  import("./src/assets/components/products.js");
}
