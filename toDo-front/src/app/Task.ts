import { Board } from './Board';
import { Card } from './Card';

export interface Task {
    id?: number;
    name: string;
    status: number;
    card?: Card;
    board?: Board
}