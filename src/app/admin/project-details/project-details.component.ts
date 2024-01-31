import { Component, OnInit } from '@angular/core';
import { Project } from '../../project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  project: Project = new Project();
  routeParamsSubscription!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}
  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      (params) => {
        let pid = params['projectid'];
        this.projectsService.getProjectByProjectID(pid).subscribe({
          next: (proj: Project) => {
            this.project = proj;
          },
        });
      }
    );
  }
  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
