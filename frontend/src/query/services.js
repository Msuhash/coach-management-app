import api from "./api.js";

export const getCoaches = async () => {
  const res = await api.get("/coaches");
  return res.data; // array
};

export const getCoach = async (id) => {
  const res = await api.get(`/coaches/${id}`);
  return res.data; // object
};

export const addCoach = async (payload) => {
  const res = await api.post("/coaches", payload);
  return res.data;
};

export const editCoach = async (id, payload) => {
  const res = await api.put(`/coaches/${id}`, payload);
  return res.data;
};

export const patchCoach = async (id, payload) => {
  const res = await api.patch(`/coaches/${id}`, payload);
  return res.data;
};


export const removeCoach = async (id) => {
  // backend returns 204 No Content; axios resolves with empty data
  const res = await api.delete(`/coaches/${id}`);
  return res.data;
};
