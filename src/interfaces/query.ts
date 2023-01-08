export interface IFilter {
  page: number;
  limit: number;
}

export interface IPaginatedAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: any;
}
