import axios from "axios";
import { del, get, post, postFormData, put, putFormData } from "./api_helper";
import * as url from "./automobile_url_helpers";


// GET CAR BRANDS LIST
const getCarBrandsList = () => get(url.GET_CAR_BRANDS);

// ADD CAR BRAND
const addCarBrand = data => postFormData(url.ADD_CAR_BRAND, data);

// UPDATE CAR BRAND
const updateCarBrandData = (userId, data) => putFormData(`${url.UPDATE_CAR_BRAND}/${userId}`, data);

const deleteCarBrandData = id => del(`${url.DELETE_CAR_BRAND}/${id}`);

const deleteAllCarBrands = () => del(url.DELETE_ALL_CAR_BRAND);


// GET COUNTRIES LIST
const fetchCountriesListData = () => get(url.GET_COUNTRIES_LIST_DATA);

export {
    getCarBrandsList,
    addCarBrand,
    updateCarBrandData,
    deleteCarBrandData,
    deleteAllCarBrands,
    fetchCountriesListData
};
