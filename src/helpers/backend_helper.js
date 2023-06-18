import axios from "axios";
import { del, get, post, postFormData, put, putFormData } from "./api_helper";
import * as url from "./url_helper";

// Register Method
const postRegister = data => post(url.POST_REGISTER, data);

//login
const postLogin = data => post(url.POST_LOGIN, data);

//dashboard
const getTotalOrdersCountData = () => get(url.GET_ORDERS_COUNT_DATA);
const getTotalRevenueCountData = () => get(url.GET_REVENUE_TOTAL_DATA);
const getOrderTotalAveragePriceApi = () =>
  get(url.GET_ORDERS_AVERAGE_PRICE);

// collections
const getCollections = () => get(url.GET_COLLECTIONS)

const addCollection = (formData, config) => postFormData(url.ADD_COLLECTION, formData, config)

const updateCollection = (collection, config) =>  putFormData(`${url.UPDATE_COLLECTION}${collection.get('_id')}`, collection, config)

const deleteCollection = collectionId =>
  del(`${url.DELETE_COLLECTION}${collectionId}`)

// products
const getProductList = () => get(url.GET_ALL_PRODUCTS_IN_LIST);

export const updateProductInList = product =>
  put(`${url.UPDATE_PRODUCT_IN_LIST}${product._id}`, {
    name: product.name,
    price: product.price,
    // Change after API is updated
    // createdAt: product.createdAt,
    // displayProduct: product.displayProduct,
    category : product.category
  });

  export const deleteProductInList = product =>
  del(`${url.DELETE_PRODUCT_IN_LIST}${product._id}`, { headers: { product } });

  export const addNewProductInList = product =>
  post(url.ADD_PRODUCT_IN_LIST, product);


export {
  postRegister,
  postLogin,
  getTotalOrdersCountData,
  getTotalRevenueCountData,
  getOrderTotalAveragePriceApi,
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  getProductList
};
