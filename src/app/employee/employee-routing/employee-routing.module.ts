import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from '../../can-activate-guard.service';
import { TasksComponent } from '../components/tasks/tasks.component';

const routes: Routes = [
  {
    path: 'employee',
    canActivate: [CanActivateGuardService],
    data: { expectedRole: 'Employee' },
    children: [
      {
        path: 'tasks',
        component: TasksComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class EmployeeRoutingModule {}
