// import axios from "axios";

// const API_URL = "http://localhost:5100/api/todos";

// export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
// export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
// export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
// export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
// export const ERROR = "ERROR";

// export const fetchTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get(API_URL);
//     dispatch({
//       type: FETCH_TODOS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: error.message,
//     });
//   }
// };

// export const addTodo = (title) => async (dispatch) => {
//   try {
//     const response = await axios.post(API_URL, { title });
//     dispatch({
//       type: ADD_TODO_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: error.message,
//     });
//   }
// };

// export const updateTodo = ({ id, ...data }) => async (dispatch) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, data);
//     dispatch({
//       type: UPDATE_TODO_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: error.message,
//     });
//   }
// };

// export const deleteTodo = (id) => async (dispatch) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     dispatch({
//       type: DELETE_TODO_SUCCESS,
//       payload: id,
//     });
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: error.message,
//     });
//   }
// };


const axios = require("axios");

const Api = "http://localhost:5173/api/todos"

export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const ADD_TODOS_SUCCESS = "ADD_TODOS_SUCCESS";
export const UPDATE_TODOS_SUCCESS = "UPDATE_TODOS_SUCCESS";
export const DELETS_TODOS_SUCCESS = "DELETE_TODOS_SUCCESS";
export const ERROR = "ERROR";

export const fetchTodos = async () =>{
    try {
        const response = await axios.get(Api);
        
        dispatch({
            type: fetchTodos,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
};