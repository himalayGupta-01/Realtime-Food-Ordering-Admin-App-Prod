import axios from "../helpers/axios"
import { messageConstant } from "./Constants";

export const getAllMessages = () => {
    return async dispatch => {

        dispatch({ type: messageConstant.FETCH_MESSAGE_REQUEST });

        const res = await axios.get('message/getmessages')
        if (res.status === 200) {

            const { messages } = res.data

            dispatch({
                type: messageConstant.FETCH_MESSAGE_SUCCESS,
                payload: { queries: messages }
            })
        } else {
            dispatch({
                type: messageConstant.FETCH_MESSAGE_FAILURE,
                payload: { error: res.data.error }
            })
        }
        // console.log("Fetched category result is ",res);
    }
}


