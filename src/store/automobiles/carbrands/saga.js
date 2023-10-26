import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import { ADD_NEW_CAR_BRAND, DELETE_ALL_CAR_BRAND, DELETE_CAR_BRAND, GET_CAR_BRANDS, GET_COUNTRIES_LIST, GET_COUNTRIES_LIST_SUCCESS, UPDATE_CAR_BRAND } from "./actionTypes"
import { addCarBrandFail, addCarBrandSuccess, deleteAllCarBrandsFail, deleteAllCarBrandsSuccess, deleteCarBrand, deleteCarBrandFail, deleteCarBrandSuccess, getCarBrandsFail, getCarBrandsSuccess, getCountriesListError, getCountriesListSuccess, updateCarBrand, updateCarBrandFail, updateCarBrandSuccess } from "./actions"
import { addCarBrand, deleteAllCarBrands, deleteCarBrandData, fetchCountriesListData, getCarBrandsList, updateCarBrandData } from "helpers/automobile_helper_apis"


function* fetchCarBrands() {
  try {
    const response = yield call(getCarBrandsList)
    yield put(getCarBrandsSuccess(response.data.carBrandsList))
  } catch (error) {
    yield put(getCarBrandsFail(error))
  }
}

function* onAddCarBrand({ payload: data }) {
  try {
    const response = yield call(addCarBrand, data)
    yield put(addCarBrandSuccess(response.data))
  } catch (error) {
    yield put(addCarBrandFail(error))
  }
}

function* onUpdateCarBrand({ payload: { id, data } }) {
  try {
    const response = yield call(updateCarBrandData, id, data );
    yield put(updateCarBrandSuccess(response.data));
  } catch (error) {
    yield put(updateCarBrandFail(error))
  }
}

function* onDeleteCarBrand({ payload: carBrand  }) {
  try {
    const response = yield call(deleteCarBrandData, carBrand._id );
    yield put(deleteCarBrandSuccess(carBrand))
  } catch (error) {
    yield put(deleteCarBrandFail(error))
  }
}

function* onDeleteAllCarBrand() {
    try {
      const response = yield call(deleteAllCarBrands)
      yield put(deleteAllCarBrandsSuccess(response))
    } catch (error) {
      yield put(deleteAllCarBrandsFail(error))
    }
  }

  function* fetchCountriesList() {
    try {
      const response = yield call(fetchCountriesListData);
      yield put(getCountriesListSuccess(response.data));
    }catch(error) {
      yield put(getCountriesListError(error));
    }
  }

function* carBrandSaga() {
  yield takeEvery(GET_CAR_BRANDS, fetchCarBrands);
  yield takeEvery(ADD_NEW_CAR_BRAND, onAddCarBrand);
  yield takeEvery(UPDATE_CAR_BRAND, onUpdateCarBrand);
  yield takeEvery(DELETE_CAR_BRAND, onDeleteCarBrand);
  yield takeEvery(DELETE_ALL_CAR_BRAND, onDeleteAllCarBrand);
  yield takeEvery(GET_COUNTRIES_LIST, fetchCountriesList);
}

export default carBrandSaga;
