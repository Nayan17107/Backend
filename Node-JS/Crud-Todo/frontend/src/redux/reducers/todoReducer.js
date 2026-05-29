// import {
//   FETCH_TODOS_SUCCESS,
//   ADD_TODO_SUCCESS,
//   UPDATE_TODO_SUCCESS,
//   DELETE_TODO_SUCCESS,
//   ERROR,
// } from "../actions/todoActions";

// const initialState = {
//   items: [],
//   status: "idle",
//   errorMsg: "",
// };

// export const todoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_TODOS_SUCCESS:
//       return {
//         ...state,
//         items: action.payload,
//         status: "succeeded",
//         errorMsg: "",
//       };

//     case ADD_TODO_SUCCESS:
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//         errorMsg: "",
//       };

//     case UPDATE_TODO_SUCCESS:
//       return {
//         ...state,
//         items: state.items.map((todo) =>
//           todo._id === action.payload._id ? action.payload : todo,
//         ),
//         errorMsg: "",
//       };

//     case DELETE_TODO_SUCCESS: 
//       return {
//         ...state,
//         items: state.items.filter((todo) => todo._id !== action.payload),
//         errorMsg: "",
//       };

//     case ERROR:
//       return {
//         ...state,
//         errorMsg: action.payload,
//       };

//     default:
//       return state;
//   }
// };

import {
  FETCH_TODOS_SUCCESS,
  ADD_TODOS_SUCCESS,
  UPDATE_TODOS_SUCCESS,
  DELETS_TODOS_SUCCESS,
  ERROR 
}from("../actions/todoActions");


const initialState => {
   items = [],
   status = "idle",
   errmsg = ""
};

export const todoReducer = (state => initialState, actions) =>{
    switch (actions.type) {
      case FETCH_TODOS_SUCCESS:
        return{
          ...state,
          items: actions.payload,
          status: "success",
          errmsg: ""
        }
      
      case ADD_TODOS_SUCCESS:
        return{
          ...state,
          items: [...state, actions.payload],
          errmsg: ""
        }
            
      case UPDATE_TODOS_SUCCESS:
        return{
          ...state,
          items: ,
          errmsg: ""
        }
    
      default:
        break;
    }
}