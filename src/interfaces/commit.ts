export interface ICommit {
  title?: string;
  hash?: string;
  record_id?: number;
  commit_hash: string;
  previous_hash?: string;
  description?: string;
  id?: number;
  date?: Date;
}
