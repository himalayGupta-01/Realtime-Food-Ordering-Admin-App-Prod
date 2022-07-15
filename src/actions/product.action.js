import axios from "../helpers/axios";
import { productConstant } from "./Constants";

// done by me to display added product immediately
export const addProduct = (form, data, categories) => {
    return async dispatch => {
        dispatch({ type: productConstant.ADD_NEW_PRODUCT_REQUEST });
        // form.forEach(val=>console.log("Data is", val))


        const res = await axios.post('product/create', form);
        if (res.status === 201) {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_SUCCESS,
                // payload: { product: res.data.product, categories: categories }
            });
        } else {
            dispatch({
                type: productConstant.ADD_NEW_PRODUCT_FAILURE,
                payload: {error:res.data.error}
            });
        }
        // console.log("Added category Result is ",res);
    }

}

export const updateProduct = (form, id) => {
    return async dispatch => {
        dispatch({ type: productConstant.UPDATE_PRODUCT_REQUEST });
        const res = await axios.post(`/product/update/${id}`, form);
        if (res.status === 201) {
            dispatch({
                type: productConstant.UPDATE_PRODUCT_SUCCESS,
                // payload: {category:res.data}
            });
        } else {
            dispatch({
                type: productConstant.UPDATE_PRODUCT_FAILURE,
                payload: {error:res.data.error}
            });
        }
        // console.log("Updated category Result is ",res);
    }

}

export const deleteProduct = (id) => {
    return async dispatch => {
        dispatch({ type: productConstant.DELETE_PRODUCT_REQUEST });
        const res = await axios.post(`/product/delete/${id}`);
        if (res.status === 200) {
            dispatch({
                type: productConstant.DELETE_PRODUCT_SUCCESS,
                // payload: {category:res.data}
            });
        } else {
            dispatch({
                type: productConstant.DELETE_PRODUCT_FAILURE,
                payload: res.data.error
            });
        }
        // console.log("Deleted category Result is ",res);
    }

}