import axios from "axios";

// Conexion con el backend
export function getCountries(order) {
  return async function (dispatch) {
    let json = await axios.get(
      "http://localhost:3001/countries?order=" + order
    );
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}
export function getCountry(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({
      type: GET_COUNTRY,
      payload: json.data,
    });
  };
}

export function cleanCountry() {
  return {
    type: CLEAN_COUNTRY,
  };
}

export function getActivities() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/activity");
    return dispatch({
      type: GET_ACTIVITY,
      payload: json.data,
    });
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/activity", payload);
    return dispatch({
      type: POST_ACTIVITY,
      payload: json.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.status);
    }
  };
}

export function orderName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_CONTINENT,
    payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_ACTIVITY,
    payload,
  };
}

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const CLEAN_COUNTRY = "CLEAN_COUNTRY";
