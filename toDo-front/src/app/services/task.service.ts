import { Injectable } from '@angular/core';
import {Task} from '../Task';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private hostUrl = environment.hostUrl;
  constructor(private http: HttpClient) {}

  getAllTasks(boardId: number): Observable<Task[]> {
    const url = `${this.hostUrl}/boards/${boardId}/tasks`;
    return this.http.get<Task[]>(url);
  }

  createNewTask(boardId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.hostUrl}/boards/${boardId}/tasks/addTask`, task);
  }

  deleteTask(boardId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.hostUrl}/boards/${boardId}/tasks/${taskId}`);
  }

  editTask(boardId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.hostUrl}/boards/${boardId}/tasks/${task.id}`, task)
  }



}
