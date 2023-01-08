import axios from "axios";
import { IFilter } from "../../interfaces/query";
import { IPaginatedGetAPIResponse, IRecord } from "../../interfaces/record";
import { clearNullFields } from "../util/misc";

const getRecord = async (
  filter?: IFilter
): Promise<IPaginatedGetAPIResponse> => {
  let normilizedFilter = clearNullFields(filter);

  return axios
    .get("/record", { params: normilizedFilter })
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
