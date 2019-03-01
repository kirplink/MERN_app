import axois from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import Axios from "axios";

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    Axios.get("/api/items")
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }));
}

export const deleteItem = (id) => dispatch => {
    Axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}

export const addItem = (item) => dispatch => {
    Axios.post("/api/items", item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}