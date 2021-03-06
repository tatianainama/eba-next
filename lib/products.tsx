import ProductData from 'data/products.json';
import { uniq } from 'ramda';

export type Category = "Protección Intensiva" | "Higiene" | "Máscaras" | "Espumas" | "Peeling" | "Ácido Hialurónico" | "Hombres" | "Activos Concentrados" | "Monodosis" | "Protección Solar" | "Corporales" | "Therapy Rituals";
export type CategoryUrl = 
  "proteccion_intensiva" |
  "higiene" |
  "mascaras" |
  "espumas" |
  "peeling" |
  "acido_hialuronico" |
  "hombres" |
  "activos_concentrados" |
  "monodosis" |
  "proteccion_solar" |
  "corporales" |
  "therapy_rituals";

export type Product = {
  name: string,
  category: Array<Category>,
  categoryUrl: Array<CategoryUrl>,
  desc: string,
  fullDesc: string,
  actives: Array<string>,
  ph: string,
  variants: {
    code: number,
    content: string,
    price: number,
    sellPrice: number,
    image: string
  }[],
  image: string,
  apply: string,
  url: string,
};

export const getAllProductsPath = () => {
  return ProductData.map(product => ({
    params: {
      url: product.url
    }
  }))
}

export const getAllProductsName = () => {
  return ProductData.map(product => {
    const name = product.name.replace(/ /g, '_')
    return {
      params: {
        name
      }
    }
  })
}

export const getProductData = (url: string | string[]): Product => {
  return ProductData.find(product => product.url === url) as Product;
}

export const getProductsByCategory = (catUrl: string) => {
  return ProductData.filter(product => product.categoryUrl.includes(catUrl))
}

export const getAllProductsCategoryPath = () => {
  return uniq(ProductData.map(product => product.categoryUrl).flat()).map(cat => ({
    params: {
      category: cat
    }
  }));
}

export const getRelated = (url: string) => {
  return ProductData.slice(0, 5);
}

export default getAllProductsName;