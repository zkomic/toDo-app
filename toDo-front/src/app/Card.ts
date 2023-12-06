import { Board } from './Board';

export interface Card {
    id?: number;
    name: string;
    status: number;
    board?: Board;
}