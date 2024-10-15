import axios from "axios";
import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
} from "./ProductsConstant";

export const getAllProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_REQUEST });

    const res = await axios.get(
      `https://gutendex.com/books/`
    );

    if (res.data.status === 200) {
      dispatch({
        type: PRODUCTS_SUCCESS,
        payload: res?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      error: error.message,
    });
  }
};
