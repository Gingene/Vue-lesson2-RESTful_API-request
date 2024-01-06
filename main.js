console.log(location.pathname);
if (location.pathname === "/" || location.pathname === "/index.html") {
  console.log("test");
  import("./src/assets/components/login.js");
} else if (location.pathname === "/product.html") {
  import("./src/assets/components/aa/products.js");
}
