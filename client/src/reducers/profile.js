import {PUT_PROFILE} from "../actions/types";

const initialState = {
  // id: null,
  // name: null,
  // email: null,
  // avatar: null,
  // adress: null,
  // phone: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case PUT_PROFILE:
		return {
		  ...state,
		  ...payload
    }
    // case DELETE_PROFILE:
		// return {
		//   ...state
    // }
    default:
      return state;
  }
}
