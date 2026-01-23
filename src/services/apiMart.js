const BASE_URL = "https://fakestoreapi.com";

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
