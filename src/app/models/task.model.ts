import { Project } from './project.model';

export class Task {
  taskID: number | null;
  taskName: string | null;
  description: string | null;
  createdOn: string | null;
  projectID: number | null;
  createdBy: string | null;
  assignedTo: string | null;
  taskPriorityID: number | null;
  lastUpdatedOn: number | null;
  currentStatus: number | null;
  currentTaskStatusID: number | null;
  project: Project = new Project();
  createdByUser: any;
  assignedToUser: any;
  taskStatusDetails: any;
  createdOnString: any;
  taskPriority: any;
  lastUpdatedOnString: any;
  constructor() {
    this.taskID = null;
    this.taskName = null;
    this.description = null;
    this.createdOn = null;
    this.projectID = null;
    this.createdBy = null;
    this.assignedTo = null;
    this.taskPriorityID = null;
    this.lastUpdatedOn = null;
    this.currentStatus = null;
    this.project = new Project();
    this.createdByUser = null;
    this.assignedToUser = null;
    this.taskStatusDetails = null;
    this.taskStatusDetails = null;
    this.currentTaskStatusID = null;
  }
}
