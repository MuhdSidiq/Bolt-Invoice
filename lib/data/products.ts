import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'School Uniform Set',
    description: 'Complete school uniform set including shirt and pants/skirt',
    skuCode: 'UNI001',
    price: 89.99,
    inventory: 100,
  },
  {
    id: '2',
    name: 'Textbook Bundle - Grade 10',
    description: 'Complete set of textbooks for Grade 10',
    skuCode: 'TXT010',
    price: 299.99,
    inventory: 50,
  },
  {
    id: '3',
    name: 'School Supplies Kit',
    description: 'Basic school supplies including notebooks, pens, and calculator',
    skuCode: 'SUP001',
    price: 49.99,
    inventory: 200,
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}