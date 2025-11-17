import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getVariables = () =>
  axios.get(`${API_BASE}/variables`).then((r) => r.data);

export const createVariable = (data) =>
  axios.post(`${API_BASE}/variables`, data).then((r) => r.data);

export const updateVariable = (id, data) =>
  axios.put(`${API_BASE}/variables/${id}`, data).then((r) => r.data);

export const deleteVariable = (id) =>
  axios.delete(`${API_BASE}/variables/${id}`).then((r) => r.data);

export const getFormulas = () =>
  axios.get(`${API_BASE}/formulas`).then((r) => r.data);

export const createFormula = (data) =>
  axios.post(`${API_BASE}/formulas`, data).then((r) => r.data);

export const deleteFormula = (id) =>
  axios.delete(`${API_BASE}/formulas/${id}`).then((r) => r.data);

export const executeFormula = (id, runtime) =>
  axios
    .post(`${API_BASE}/formulas/${id}/execute`, { runtime })
    .then((r) => r.data);
