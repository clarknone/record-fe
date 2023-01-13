import { IPaginatedAPIResponse } from "./query";

export interface IQuote {
  text?: string;
  id?: number;
  date?: Date;
}

export interface IPaginatedGetAPIResponse extends IPaginatedAPIResponse {
  results: IQuote[];
}
