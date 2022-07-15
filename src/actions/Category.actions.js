import axios from "../helpers/axios"
import { categoryConstant } from "./Constants";

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST });

        const res = await axios.get('category/getcategory')
        if (res.status === 200) {

            const { categories } = res.data

            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categories }
            })
        } else {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
        // console.log("Fetched category result is ",res);
    }
}

export const addCategory = (name) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post('/category/create', { name });
        if (res.status === 201) {
            dispatch({
                type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                // payload: { category: res.data.category }
            });
        } else {
            dispatch({
                type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload: {error:res.data.error}
            });
        }
        // console.log("Added category result is ",res);
    }

}

export const updateCategory = (name, id) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
        const res = await axios.post(`/category/update/${id}`, { name });
        if (res.status === 201) {
            dispatch({
                type: categoryConstant.UPDATE_CATEGORY_SUCCESS,
                // payload: {category:res.data}
            });
        } else {
            dispatch({
                type: categoryConstant.UPDATE_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
        // console.log("Updated category Result is ",res);
    }

}

export const deleteCategory = (id) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });
        const res = await axios.post(`/category/delete/${id}`);
        if (res.status === 200) {
            dispatch({
                type: categoryConstant.DELETE_CATEGORY_SUCCESS,
            });
        } else {
            dispatch({
                type: categoryConstant.DELETE_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
        // console.log("Deleted category Result is ",res);
    }

}