import { ADD_CAR_VARIANT_FAIL, ADD_CAR_VARIANT_SUCCESS, DELETE_ALL_CAR_VARIANT_SUCCESS, DELETE_CAR_VARIANT_FAIL, DELETE_CAR_VARIANT_SUCCESS, GET_CAR_VARIANTS_FAIL, GET_CAR_VARIANTS_SUCCESS, GET_COUNTRIES_LIST_SUCCESS, UPDATE_CAR_VARIANT_FAIL, UPDATE_CAR_VARIANT_SUCCESS } from "./actionTypes";

const INIT_STATE = {
    carVariants: [],
    countries: [],
    error: {},
};

const carVariant = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CAR_VARIANTS_SUCCESS:
            return {
                ...state,
                carVariants: action.payload,
            };

        case GET_CAR_VARIANTS_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_CAR_VARIANT_SUCCESS:
            return {
                ...state,
                carVariants: [...state.carVariants, action.payload.carVariant],
            };

        case ADD_CAR_VARIANT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_CAR_VARIANT_SUCCESS:
            return {
                ...state,
                carVariants: state.carVariants.map(carVariant =>
                    carVariant.id.toString() === action.payload.id.toString()
                        ? { carVariant, ...action.payload }
                        : carVariant
                ),
            };

        case UPDATE_CAR_VARIANT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_CAR_VARIANT_SUCCESS:
            return {
                ...state,
                carVariants: state.carVariants.filter(
                    carVariant => carVariant._id.toString() !== action.payload._id.toString()
                ),
            };

        case DELETE_CAR_VARIANT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_ALL_CAR_VARIANT_SUCCESS:
            return {
                ...state,
                carVariants: []
            }
        case GET_COUNTRIES_LIST_SUCCESS:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
};

export default carVariant;
