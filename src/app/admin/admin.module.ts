import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { NumberToWordsPipe } from '../pipes/number-to-words.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { DashboardService } from '../services/dashboard.service';
import { AboutComponent } from './about/about.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SharedModule } from '../shared/shared.module';
import { CountriesComponent } from './components/countries/countries.component';
import { ClientLocationsComponent } from './components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';
import { MastersComponent } from './components/masters/masters.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
  exports: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
  ],
  providers: [DashboardService],
})
export class AdminModule {}
