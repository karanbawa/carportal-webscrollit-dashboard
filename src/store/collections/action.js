import {
    GET_COLLECTIONS,
    GET_COLLECTIONS_SUCCESS,
    GET_COLLECTIONS_FAIL,
    ADD_COLLECTION,
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_FAIL,
    UPDATE_COLLECTION,
    UPDATE_COLLECTION_SUCCESS,
    UPDATE_COLLECTION_FAIL,
    DELETE_COLLECTION,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL,
} from './actionTypes';

export const getCollections = () => ({
    type: GET_COLLECTIONS,
  });
  
  export const getCollectionsSuccess = collections => ({
    type: GET_COLLECTIONS_SUCCESS,
    payload: collections,
  });
  
  export const getCollectionsFail = error => ({
    type: GET_COLLECTIONS_FAIL,
    payload: error,
  });
  
  export const addCollection = (collection, history) => ({
    type: ADD_COLLECTION,
    payload: { collection, history },
  });
  
  export const addCollectionSuccess = collection => ({
    type: ADD_COLLECTION_SUCCESS,
    payload: collection,
  });
  
  export const addCollectionFail = error => ({
    type: ADD_COLLECTION_FAIL,
    payload: error,
  });
  
  export const updateCollection = (collection, history) => ({
    type: UPDATE_COLLECTION,
    payload: { collection, history },
  });
  
  export const updateCollectionSuccess = collection => ({
    type: UPDATE_COLLECTION_SUCCESS,
    payload: collection,
  });
  
  export const updateCollectionFail = error => ({
    type: UPDATE_COLLECTION_FAIL,
    payload: error,
  });
  
  export const deleteCollection = (collectionId, history) => ({
    type: DELETE_COLLECTION,
    payload: { collectionId, history },
  });
  
  export const deleteCollectionSuccess = collectionId => ({
    type: DELETE_COLLECTION_SUCCESS,
    payload: collectionId,
  });
  
  export const deleteCollectionFail = error => ({
    type: DELETE_COLLECTION_FAIL,
    payload: error,
  });