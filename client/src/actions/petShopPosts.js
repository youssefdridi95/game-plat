import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SHOP_POSTS,
  UPDATE_SHOP_LIKES,
  DELETE_SHOP_POST,
  ADD_SHOP_POST,
  GET_SHOP_POST,
  ADD_SHOP_COMMENT,
  REMOVE_SHOP_COMMENT,
  PUT_SHOP_POST,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  POST_SHOP_ERROR

} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/petshopposts');
    console.log(res.data)
    dispatch({
      type: GET_SHOP_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.log("error:", err)
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/petshopposts/like/${id}`);

    dispatch({
      type: UPDATE_SHOP_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/petshopposts/unlike/${id}`);

    dispatch({
      type: UPDATE_SHOP_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/petshopposts/${id}`);

    dispatch({
      type: DELETE_SHOP_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/petshopposts', formData, config);

    dispatch({
      type: ADD_SHOP_POST,
      payload: res.data
    });
    
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
	  
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/petshopposts/${id}`);

    dispatch({
      type: GET_SHOP_POST,
      payload: res.data
    });
  } catch (err) {
    console.log('error', err)
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Add comment
export const addComment = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/petshopposts/comment/${id}`,
      formData,
      config
    );

    dispatch({
      type: ADD_SHOP_COMMENT,
      payload: { id, comments: res.data }
      // res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.log('error', err)
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/petshopposts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_SHOP_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};
// Modify Post
export const editPost = (id, newShopPost) => async dispatch => {
  try {
    const res = await axios.put(`/api/petshopposts/${id}`, newShopPost);
    console.log('newShopPost', newShopPost)

    dispatch({
      type: PUT_SHOP_POST,
      payload: { id, new: res.data } 
    });
  } catch (err) {
    dispatch({
      type: POST_SHOP_ERROR,
      payload: { msg: err.response }
    });
  }
};