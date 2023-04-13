import axios from "axios";


export const getAllFromApi = (url) => axios.get(url);
export const getFromApi = (url, param) => axios.get(url, param);

export const postInApi = (url, params)=> axios.post(url, params);

export const putInApi = (url, params) =>axios.put(url, params);

export const deleteFromApi = (url, param) => axios.delete(url, param);