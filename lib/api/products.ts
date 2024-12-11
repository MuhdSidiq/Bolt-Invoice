import { fetchProducts, createProduct } from '../directus';
import { Product } from '../types';

export async function getProducts(): Promise<Product[]> {
  return await fetchProducts();
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
  return await createProduct(product);
}