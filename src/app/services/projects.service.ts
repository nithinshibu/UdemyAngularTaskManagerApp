import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer, Subject, map } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  url: string = environment.apiBaseUrl + 'Projects';
  public MySubject!: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.MySubject = new BehaviorSubject<boolean>(false);
  }

  toggleDetails() {
    this.MySubject.next(!this.MySubject.value);
  }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient
      .get<Project[]>(this.url, { responseType: 'json' })
      .pipe(
        map((data: Project[]) => {
          for (let i = 0; i < data.length; i++) {
            // data[i].teamSize = data[i].teamSize * 100;
          }
          return data;
        })
      );
  }

  getProjectByProjectID(ProjectID: number): Observable<Project> {
    return this.httpClient.get<Project>(
      'api/Projects/searchbyProjectID/' + ProjectID,
      { responseType: 'json' }
    );
  }

  insertProject(newProject: Project): Observable<Project> {
    var requestHeader = new HttpHeaders();
    var xsrfReqToken = sessionStorage.getItem('Xsrf-Request-Token') || '';
    requestHeader = requestHeader.set('X-XSRF-Token', xsrfReqToken);
    //console.log(`New Project from service = ${JSON.stringify(newProject)}`);
    return this.httpClient.post<Project>('/api/projects', newProject, {
      responseType: 'json',
      headers: requestHeader,
    });
  }

  updateProject(exisitingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>('/api/projects', exisitingProject, {
      responseType: 'json',
    });
  }

  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>(
      '/api/projects?ProjectID=' + ProjectID
    );
  }

  searchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      '/api/projects/search/' + searchBy + '/' + searchText,
      {
        responseType: 'json',
      }
    );
  }
}
