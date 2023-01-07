import axios from "axios";
import { IRecord } from "../../interfaces/record";

const getRecord = async (filter?: {}) => {
  return axios
    .get("/record", { params: filter })
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

const createRecord = async (data: IRecord) => {
  return axios
    .post("/record/", data)
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};
const updateRecord = async (data: IRecord) => {
  return axios
    .put(`/record/${data.id}`, data)
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};
const deleteRecord = async (data: IRecord) => {
  return axios.delete(`/record/${data.id}`).catch((e) => {
    // console.log(e);
    throw new Error(e.response?.data || e.message);
  });
};

export { getRecord, createRecord, updateRecord, deleteRecord };
