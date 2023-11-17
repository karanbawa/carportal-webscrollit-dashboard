import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import { ADD_NEW_CAR_VARIANT, DELETE_ALL_CAR_VARIANT, DELETE_CAR_VARIANT, GET_CAR_VARIANTS, GET_COUNTRIES_LIST, GET_COUNTRIES_LIST_SUCCESS, UPDATE_CAR_VARIANT } from "./actionTypes"
import { addCarVariant, deleteCarVariantData, fetchCountriesListData, getCarVariantsList, updateCarVariantData } from "helpers/automobile_helper_apis"
import { addCarVariantFail, addCarVariantSuccess, deleteAllCarVariantsFail, deleteAllCarVariantsSuccess, deleteCarVariantFail, deleteCarVariantSuccess, getCarVariantsFail, getCarVariantsSuccess, getCountriesListError, getCountriesListSuccess, updateCarVariantFail, updateCarVariantSuccess } from "./actions"


function* fetchCarVariants() {
  try {
    const response = yield call(getCarVariantsList)
    yield put(getCarVariantsSuccess(response.data.carModelsList))
  } catch (error) {
    yield put(getCarVariantsFail(error))
  }
}

function* onAddCarVariant({ payload: {id , data } }) {
  try {
    const response = yield call(addCarVariant, id, data)
    yield put(addCarVariantSuccess(response.data))
  } catch (error) {
    yield put(addCarVariantFail(error))
  }
}

function* onUpdateCarVariant({ payload: { carModelId, id, data } }) {
  try {
    const response = yield call(updateCarVariantData, carModelId, id, data )
    yield put(updateCarVariantSuccess(id))
  } catch (error) {
    yield put(updateCarVariantFail(error))
  }
}

function* onDeleteCarVariant({ payload: carModel  }) {
  try {
    const response = yield call(deleteCarVariantData, carModel._id );
    yield put(deleteCarVariantSuccess(carModel))
  } catch (error) {
    yield put(deleteCarVariantFail(error))
  }
}

function* onDeleteAllCarVariant() {
    try {
      const response = yield call(deleteAllCarModels)
      yield put(deleteAllCarVariantsSuccess(response))
    } catch (error) {
      yield put(deleteAllCarVariantsFail(error))
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

function* carVariantSaga() {
  yield takeEvery(GET_CAR_VARIANTS, fetchCarVariants);
  yield takeEvery(ADD_NEW_CAR_VARIANT, onAddCarVariant);
  yield takeEvery(UPDATE_CAR_VARIANT, onUpdateCarVariant);
  yield takeEvery(DELETE_CAR_VARIANT, onDeleteCarVariant);
  yield takeEvery(DELETE_ALL_CAR_VARIANT, onDeleteAllCarVariant);
  yield takeEvery(GET_COUNTRIES_LIST, fetchCountriesList);
}

export default carVariantSaga;
