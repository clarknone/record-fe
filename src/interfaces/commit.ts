export interface ICommit {
  title?: string;
  hash?: string;
  commit_hash: string;
  previous_hash?: string;
  description?: string;
  id?: number;
  date?: Date;
}
