import {
  GET_PETS,
  DELETE_PET,
  ADD_PET,
  EDIT_PET
  // PETS_ERROR
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PETS:
      return [...payload];
    case DELETE_PET:
      return [...state.filter(pet => pet._id !== payload.id)];
    case ADD_PET:
      return [...state, ...payload];
    case EDIT_PET:
      return [...state.map(pet => (pet._id === payload.id?{...payload.data}:pet))];
    default:
      return state;
  }
}
