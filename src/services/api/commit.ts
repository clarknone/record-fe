import axios from "axios";
import { ICommit } from "../../interfaces/commit";
import { IRecord } from "../../interfaces/record";

const getCommit = async (filter?: {}): Promise<ICommit[]> => {
  return axios
    .get("/record/commit", { params: filter })
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
