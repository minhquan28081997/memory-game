export interface CardInterface {
  id: number;
  src: string;
  value: number;
  match: boolean;
}

export interface IBoard {
  id: number,
  turns: number,
  time: number,
  createdAt?: any
}
