import {GET_PETS,PETS_ERROR,DELETE_PET,ADD_PET,EDIT_PET} from "./types";
import axios from 'axios'

export const getPets = (id) => async dispatch => {
	try{
		const res = await axios.get(`/api/pets/byuserid/${id}`)
		dispatch({
			type: GET_PETS,
			payload: res.data
		  })
	}
	catch (err) {
		console.log(err)
		dispatch({
		  type: PETS_ERROR
		});
	  }
}

export const delPet = (id) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/pets/${id}`);
			dispatch({
				type: DELETE_PET,
				payload: id
			});
		}
		catch (err) {
			console.log(err);
			dispatch({
				type: PETS_ERROR
			});
		}
	};
}

export const addPet = (newPet) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(`/api/pets`,newPet);
			dispatch({
				type: ADD_PET,
				payload: res.data
			});
		}
		catch (err) {
			console.log(err);
			dispatch({
				type: PETS_ERROR
			});
		}
	};
}

export const editPet = (id,newPet) => {
	return async (dispatch) => {
		try {
			const res = await axios.put(`/api/pets/${id}`,newPet);
			dispatch({
				type: EDIT_PET,
				payload: {data:res.data,id:id}
			});
		}
		catch (err) {
			console.log(err);
			dispatch({
				type: PETS_ERROR
			});
		}
	};
}