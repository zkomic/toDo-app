import { Injectable } from '@angular/core';
import { Card } from '../Card';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private hostUrl = environment.hostUrl + "/cards";
  constructor(private http: HttpClient) {}

  getCards(boardId: number): Observable<Card[]> {
    const url = `${this.hostUrl}/getAllCards/${boardId}`;
    return this.http.get<Card[]>(url);
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.hostUrl + "/createCard", card);
  }

  deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.hostUrl}/${cardId}`);
  }

}
