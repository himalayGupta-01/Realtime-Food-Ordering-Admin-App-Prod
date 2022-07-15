import { messageConstant } from "../actions/Constants";

const initState = {
    queries: [],
    loading: false,
    error: ""
};

const MessageReducer = (state = initState, action) => {
    switch (action.type) {
        case messageConstant.FETCH_MESSAGE_SUCCESS:
            state = {
                ...state,
                queries: action.payload.queries
            }
            break;

        default: break;
    }
    return state;
}

export default MessageReducer