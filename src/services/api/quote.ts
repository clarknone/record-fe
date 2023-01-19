import axios from "axios";
import { IFilter } from "../../interfaces/query";
import { IPaginatedGetAPIResponse, IQuote } from "../../interfaces/quote";
import { clearNullFields } from "../util/misc";

const getQuotes = async (filter?: IFilter): Promise<IPaginatedGetAPIResponse> => {
  let normilizedFilter = clearNullFields(filter);

  return axios
    .get("/quote", { params: normilizedFilter })
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

const getTodayQuote = async (): Promise<IQuote> => {
  return axios
    .get("/quote/today")
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e.response?.data || e.message);
    });
};

const createQuote = async (data: IQuote) => {
  return axios
    .post("/quote/", data)
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

const updateQuote = async (data: IQuote) => {
  return axios
    .put(`/quote/${data.id}`, data)
    .then((res) => res.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

const deleteQuote = async (data: IQuote) => {
  return axios
    .delete(`/quote/${data.id}`)
    .then((resp) => resp.data)
    .catch((e) => {
      // console.log(e);
      throw new Error(e.response?.data || e.message);
    });
};

export { getQuotes, getTodayQuote, createQuote, updateQuote, deleteQuote };
