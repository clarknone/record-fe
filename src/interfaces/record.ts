import { IPaginatedAPIResponse } from "./query";

export interface IRecord {
  title: string;
  description: string;
  language?: string;
  id?: number;
  date_created?: Date;
}

export interface IPaginatedGetAPIResponse extends IPaginatedAPIResponse {
  results: IRecord[];
}
