// const BASE_URL = "https://fakestoreapi.com";
const BASE_URL = "http://localhost:8000";
export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}
export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  const data = await response.json();
  return data;
}
export async function fetchProductsByCategory(category) {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  const data = await response.json();
  return data;
}
export async function fetchCart() {
  const response = await fetch(`${BASE_URL}/carts/1`);
  const data = await response.json();
  return data;
}
export async function fetchOrders() {
  const response = await fetch(`${BASE_URL}/orders`);
  const data = await response.json();
  return data;
}

export async function createOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  return data;
}
export async function addToCart(cartData) {
  const response = await fetch(`${BASE_URL}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });
  const data = await response.json();
  return data;
}
export async function updateCart(cartId, cartData) {
  const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });
  const data = await response.json();
  return data;
}
export async function deleteFromCart(cartId) {
  const response = await fetch(`${BASE_URL}/carts/${cartId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
}
