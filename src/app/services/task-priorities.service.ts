import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskPriority } from '../models/task-priority.model';

@Injectable({
  providedIn: 'root',
})
export class TaskPrioritiesService {
  constructor(private httpClient: HttpClient) {}
  getTaskPriorities(): Observable<TaskPriority[]> {
    return this.httpClient.get<TaskPriority[]>('/api/taskpriorities', {
      responseType: 'json',
    });
  }

  getTaskPrioritytByTaskPriorityID(
    TaskPriorityID: number
  ): Observable<TaskPriority> {
    return this.httpClient.get<TaskPriority>(
      '/api/taskpriorities/searchbytaskpriorityid/' + TaskPriorityID,
      { responseType: 'json' }
    );
  }

  insertTaskPriority(newTaskPriority: TaskPriority): Observable<TaskPriority> {
    return this.httpClient.post<TaskPriority>(
      '/api/taskpriorities',
      newTaskPriority,
      { responseType: 'json' }
    );
  }

  updateTaskPriority(
    existingTaskPriority: TaskPriority
  ): Observable<TaskPriority> {
    return this.httpClient.put<TaskPriority>(
      '/api/taskpriorities',
      existingTaskPriority,
      { responseType: 'json' }
    );
  }

  deleteTaskPriority(TaskPriorityID: number): Observable<string> {
    return this.httpClient.delete<string>(
      '/api/taskpriorities?TaskPriorityID=' + TaskPriorityID
    );
  }
}
