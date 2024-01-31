import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from '../../can-activate-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ProjectsComponent } from '../projects/projects.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [CanActivateGuardService],
    data: { expectedRole: 'Admin' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'projects/view/:projectid',
        component: ProjectDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
