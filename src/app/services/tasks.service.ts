import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  insertTask(newTask: Task): Observable<Task> {
    var user = sessionStorage.getItem('currentuser')
      ? JSON.parse(sessionStorage.getItem('currentuser') as string)
      : null;

    newTask.createdBy = user.id; //add this statement to store the current user's id in the 'tasks' table
    return this.httpClient.post<Task>('/api/createtask', newTask, {
      responseType: 'json',
    });
  }
}
