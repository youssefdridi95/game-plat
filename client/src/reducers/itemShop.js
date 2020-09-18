import {
  GET_ITEMS,
  ITEM_ERROR,
  UPDATE_LIKES,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEM,
  ADD_ITEM_COMMENT,
  REMOVE_ITEM_COMMENT,
  EDIT_ITEM,
  ITEM_MOST_RECENT_SORT,
  ITEM_LEAST_RECENT_SORT
} from "../actions/types";

const initialState = {
  items: [],
  item: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case GET_ITEM:
      return {
        ...state,
        item: payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload),
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === payload.id ? { ...item, likes: payload.likes } : item
        ),
      };
    case ADD_ITEM_COMMENT:
      return {
        ...state,
        items: state.items.map(item =>
          item._id === payload.id
            ? { ...item, comments: payload.comments }
            : item
        ),
        //   { ...state.item, comments: payload },
        
      };
    case REMOVE_ITEM_COMMENT:
      return {
        ...state,
        item: {
          ...state.item,
          comments: state.item.comments.filter(
            comment => comment._id !== payload
          )
        },

        
      };
    case EDIT_ITEM:
      return {
        ...state,
        ...payload
      };
      case ITEM_MOST_RECENT_SORT:
        return {
          ...state,
          items: state.items.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA;
          })
        }
      case ITEM_LEAST_RECENT_SORT:
        return {
          ...state,
          items: state.items.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB;
          })
        }
    default:
      return state;
  }
}
