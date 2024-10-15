import { PRODUCTS_SUCCESS } from "./ProductsConstant";

export const getProductsReducer = (state = { fiscalYear: [] }, action) => {

    switch (action.type) {
        case PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload


            }

        default:
            return state
    }


};
