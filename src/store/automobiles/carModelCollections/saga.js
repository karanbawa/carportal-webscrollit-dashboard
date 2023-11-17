import { call, put, takeEvery } from "redux-saga/effects";

// Collection Redux States
import {
  getCollectionsSuccess,
  getCollectionsFail,
  updateCollectionSuccess,
  updateCollectionFail,
  deleteCollectionSuccess,
  deleteCollectionFail,
  addCollectionSuccess,
  addCollectionFail,
  getCarModelCollectionsFail,
  getCarModelCollectionsSuccess,
} from "./action";

import {
  getCollections,
  updateCollection,
  deleteCollection,
  addCollection,
  getProductList,
} from "helpers/backend_helper";
import { showToastError, showToastSuccess } from "helpers/toastBuilder";
import { ADD_CAR_MODEL_COLLECTION, DELETE_CAR_MODEL_COLLECTION, GET_CAR_MODEL_COLLECTIONS, UPDATE_CAR_MODEL_COLLECTION } from "./actionTypes";
import { getCarModelsList } from "helpers/automobile_helper_apis";

function* fetchCollections() {
  try {
    const carModels = yield call(getCarModelsList);
    const response = yield call(getCollections);
    yield put(
      getCarModelCollectionsSuccess([
        {
          name: "All Car Models",
          _id: "all-carmodels",
          icon: "ballot",
          color: "#7A8D96",
          carModels: carModels.data.carModels.map(carModel => carModel._id),
        },
        ...response.data,
      ])
    );
  } catch (error) {
    yield put(getCarModelCollectionsFail);
  }
}

function* onUpdateCollection({ payload: { collection, history, url } }) {
  try {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const response = yield call(updateCollection, collection, config);
    yield put(updateCollectionSuccess(response.data));
    showToastSuccess("Collection Updated successfully", "Success");
    history(url);
  } catch (error) {
    yield put(updateCollectionFail(error));
    showToastError("Sorry! Failed to update the collection", "Error");
    history(url);
  }
}

function* onDeleteCollection({ payload: { collectionId, history } }) {
  try {
    const response = yield call(deleteCollection, collectionId);
    yield put(deleteCollectionSuccess(collectionId));
    history("/ecommerce-collections");
    showToastSuccess("Collection Deleted successfully", "Success");
  } catch (error) {
    yield put(deleteCollectionFail(error));
    history("/ecommerce-collections");
    showToastError("Sorry! Failed to delete the collection", "Error");
  }
}

function* onAddCollection({ payload: { collection, history } }) {
  try {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    console.log('onAddCollectyioncalled ', collection, history);
    const response = yield call(addCollection, collection, config);
    yield put(addCollectionSuccess(response));
    showToastSuccess("Collection Added successfully", "Success");
    history("/ecommerce-collections");
  } catch (error) {
    yield put(addCollectionFail(error));
    showToastError("Sorry! Failed to Add the collection", "Error");
  }
}

function* collectionSaga() {
  yield takeEvery(ADD_CAR_MODEL_COLLECTION, onAddCollection);
  yield takeEvery(GET_CAR_MODEL_COLLECTIONS, fetchCollections);
  yield takeEvery(UPDATE_CAR_MODEL_COLLECTION, onUpdateCollection);
  yield takeEvery(DELETE_CAR_MODEL_COLLECTION, onDeleteCollection);
}

export default collectionSaga;
