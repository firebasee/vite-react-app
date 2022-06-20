import baseService from "./baseService";
import endpoints from "../constants/endpoints";

export async function getProducts() {
  const { data } = await baseService.get(`${endpoints.PRODUCTS}`);

  return data;
}

export async function getProduct(id) {
  const { data } = await baseService.get(`${endpoints.PRODUCTS}/${id}`);

  return data;
}
