import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private hostUrl = environment.hostUrl + "/boards";

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.hostUrl);
  }

  createNewBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.hostUrl, board);
  }

  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.hostUrl}/${id}`);
  }

}
