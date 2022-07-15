import { orderConstant } from "../actions/Constants";


const initialState = {
    orders: [],
    loading: false,
    error: ""
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case orderConstant.ORDERS_FETCHED_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case orderConstant.ORDERS_FETCHED_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                loading: false

            }
            break;
        case orderConstant.ORDERS_FETCHED_FAILURE:
            state = {
                ...initialState
            }
            break;

        case orderConstant.UPDATE_ORDER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case orderConstant.UPDATE_ORDER_SUCCESS:
            state = {
                ...state,
                // orders: action.payload.orders,
                loading: false

            }
            break;
        case orderConstant.UPDATE_ORDER_FAILURE:
            state = {
                ...initialState
            }
            break;
        default: break;
    }
    return state;
}
export default orderReducer;