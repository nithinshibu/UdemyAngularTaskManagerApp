import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UpdateTaskStatusComponent } from './components/update-task-status/update-task-status.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent,
  ],
  imports: [SharedModule, EmployeeRoutingModule],
  exports: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent,
  ],
})
export class EmployeeModule {}
