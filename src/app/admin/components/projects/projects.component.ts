import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ProjectsService } from '../../../projects.service';
import { Project } from '../../../project.model';
import { DatePipe } from '@angular/common';
import { ClientLocation } from '../../../client-location.model';
import { ClientLocationService } from '../../../client-location.service';
import { NgForm } from '@angular/forms';
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from '../../../filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  //clientLocations: ClientLocation[] = [];
  clientLocations!: Observable<ClientLocation[]>;
  showLoading: boolean = true;
  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: any = null;
  deleteProject: Project = new Project();
  deleteIndex: any = null;
  pipe = new DatePipe('en-US');
  searchBy: string = 'projectName';
  searchText: string = '';

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;

  @ViewChild('newForm') newForm!: NgForm;
  @ViewChild('editForm') editForm!: NgForm;
  @ViewChild('newFormCancel') newFormCancel!: ElementRef;
  @ViewChild('editFormCancel') editFormCancel!: ElementRef;
  constructor(
    private projectsService: ProjectsService,
    private clientLocationService: ClientLocationService
  ) {}
  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects; // Update the component's list with received data
        this.showLoading = false;
        this.calculateNoOfPages();
      },
    });

    // this.clientLocationService.getClientLocations().subscribe({
    //   next: (response) => {
    //     this.clientLocations = response;
    //   },
    // });

    this.clientLocations = this.clientLocationService.getClientLocations();
  }

  isAllChecked: boolean = false;

  @ViewChildren('prj') projs!: QueryList<ProjectComponent>;

  isAllCheckedChange(event: any) {
    let proj = this.projs.toArray();
    for (let i = 0; i < proj.length; i++) {
      proj[i].isAllCheckedChange(this.isAllChecked);
    }
  }

  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(
      this.projects,
      this.searchBy,
      this.searchText
    );

    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  onSaveClick() {
    if (this.newForm.valid) {
      this.newProject.clientLocation.clientLocationID = 0;
      this.newProject.projectID = 0;
      this.newProject.active = true;
      //console.log(`New Project = ${JSON.stringify(this.newProject)}`);

      this.projectsService.insertProject(this.newProject).subscribe({
        next: (response) => {
          //Add Project to Grid
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          // p.dateOfStart = response.dateOfStart.split('/').reverse().join('-');
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;
          this.projects.push(p);
          //Clear New Project Dialog - TextBoxes
          this.newProject = new Project();

          this.newFormCancel.nativeElement.click();
          this.calculateNoOfPages();
        },
      });
    }
  }

  onEditClick(event: any, projectID: number) {
    this.editForm.resetForm();
    var index = this.projects.findIndex(
      (project) => project.projectID === projectID
    );
    setTimeout(() => {
      this.editProject.projectID = this.projects[index].projectID;
      this.editProject.projectName = this.projects[index].projectName;
      this.editProject.dateOfStart =
        this.pipe
          .transform(this.projects[index].dateOfStart, 'yyyy-MM-dd')
          ?.toString() ?? '';
      this.editProject.teamSize = this.projects[index].teamSize;
      this.editProject.active = this.projects[index].active;
      this.editProject.clientLocationID = this.projects[index].clientLocationID;
      this.editProject.clientLocation = this.projects[index].clientLocation;
      this.editProject.status = this.projects[index].status;
      this.editIndex = index;
    }, 100);
  }

  onUpdateClick() {
    if (this.editForm.valid) {
      this.projectsService.updateProject(this.editProject).subscribe({
        next: (response) => {
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;
          //const data: Project = { ...response };
          //console.log(`Spread values : ${data}`);
          this.projects[this.editIndex] = p;

          this.editProject = new Project();

          this.editFormCancel.nativeElement.click();
        },
      });
    }
  }

  onDeleteClick(event: any, projectID: number) {
    var index = this.projects.findIndex(
      (project) => project.projectID === projectID
    );
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart =
      this.pipe
        .transform(this.projects[index].dateOfStart, 'yyyy-MM-dd')
        ?.toString() ?? '';
    this.deleteProject.teamSize = this.projects[index].teamSize;
    this.calculateNoOfPages();
  }

  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe({
      next: (response) => {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject = new Project();
      },
    });
  }

  onSearchClick() {
    // this.projectsService
    //   .searchProjects(this.searchBy, this.searchText)
    //   .subscribe({
    //     next: (response) => {
    //       this.projects = response;
    //     },
    //   });
  }
  onSearchTextKeyup(event: any) {
    this.calculateNoOfPages();
  }

  onNewClick(event: any) {
    this.newForm.resetForm();
  }

  onHideShowDetails(event: any) {
    this.projectsService.toggleDetails();
  }

  onPageIndexClicked(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }
}
