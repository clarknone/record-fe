import axios from "axios";
import { IPaginatedGetAPIResponse, ICommit } from "../../interfaces/commit";
import { IFilter } from "../../interfaces/query";
import { clearNullFields } from "../util/misc";

const getCommit = async (filter?: IFilter): Promise<IPaginatedGetAPIResponse> => {
  let normilizedFilter = clearNullFields(filter);
  return axios
    .get("/record/commit", { params: normilizedFilter })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

const createCommit = async (data: ICommit) => {
  return axios
    .post("/record/commit", data)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

export { getCommit, createCommit };
