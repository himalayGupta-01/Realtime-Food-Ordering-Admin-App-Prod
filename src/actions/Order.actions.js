import axios from "../helpers/axios";
import { orderConstant } from "./Constants";

export const getAllOrders = () => {
    return async dispatch => {

        dispatch({ type: orderConstant.ORDERS_FETCHED_REQUEST });

        const res = await axios.get(`/all-orders`);
        console.log(res.data);
        if (res.status === 200) {

            const { orders } = res.data

            dispatch({
                type: orderConstant.ORDERS_FETCHED_SUCCESS,
                payload: { orders: orders }
            })
        } else {
            dispatch({
                type: orderConstant.ORDERS_FETCHED_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const updateOrder=(id,status)=>{
    return async dispatch => {

        dispatch({ type: orderConstant.UPDATE_ORDER_REQUEST });

        const res = await axios.post(`/update-status/${id}/${status}`);
        console.log(res.data);
        if (res.status === 200) {

            // const { order } = res.data

            dispatch({
                type: orderConstant.UPDATE_ORDER_SUCCESS,
                // payload: { order: order }
            })
        } else {
            dispatch({
                type: orderConstant.UPDATE_ORDER_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}