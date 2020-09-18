import {
    LOAD_USERS,
    LOAD_USER,
    LOADING,
    STOP_LOADING
} from '../actions/types';

const initialState = {
    users: [],
    user: null,
    loading: false,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type){
        case LOAD_USERS:
            return {
                ...state,
                users: payload,
                loading: false,
            };
            break;
        case LOAD_USER:
            return {
                ...state,
                user: payload,
                loading: false,
            };
            break;
        case LOADING:
            return {
                ...state,
                loading:true
            };
            break;
            case STOP_LOADING:
                return {
                    ...state,
                    loading:false
                };
                break;
        default: return state;
    }
  }