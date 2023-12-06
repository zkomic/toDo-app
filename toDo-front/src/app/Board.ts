import { Card } from "./Card";

export interface Board {
    id?: number;
    name: string;
    cards?: Card[];
}