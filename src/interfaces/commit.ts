import { IPaginatedAPIResponse } from "./query";

export interface ICommit {
  title?: string;
  hash?: string;
  record_id?: number;
  language?: string;
  commit_hash: string;
  previous_hash?: string;
  description?: string;
  id?: number;
  date?: Date;
}

export interface IPaginatedGetAPIResponse extends IPaginatedAPIResponse {
  results: ICommit[];
}
