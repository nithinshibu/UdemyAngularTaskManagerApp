import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project.model';
import { TaskPriority } from '../../../models/task-priority.model';
import { TasksService } from '../../../services/tasks.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ProjectsService } from '../../../services/projects.service';
import { TaskPrioritiesService } from '../../../services/task-priorities.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  projects!: Observable<Project[]>;
  employees!: Observable<any>;
  taskPriorities!: Observable<TaskPriority[]>;
  newTaskFormSubmitted: boolean = false;
  constructor(
    private tasksService: TasksService,
    private router: Router,
    private projectsService: ProjectsService,
    private taskPrioritiesService: TaskPrioritiesService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [Validators.required]),
      assignedTo: new FormControl(null, [Validators.required]),
      taskPriorityID: new FormControl(2, [Validators.required]),
    });

    this.projects = this.projectsService.getAllProjects();
    this.employees = this.loginService.getAllEmployes();
    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
  }
  onCreateTaskClick(event: any) {
    this.newTaskFormSubmitted = true;

    if (this.newTaskForm.valid) {
      this.tasksService.insertTask(this.newTaskForm.value).subscribe({
        next: () => {
          this.router.navigate(['/employee', 'tasks']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log(this.newTaskForm.errors);
    }
  }
}
