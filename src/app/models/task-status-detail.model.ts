import { TaskStatus } from './task-status.model';

export class TaskStatusDetail {
  taskStatusDetailID: number | null;
  taskID: number | null;
  taskStatusID: number | null;
  userID: string | null;
  description: string | null;
  taskstatus: TaskStatus = new TaskStatus();
  user: any | null;
  statsUpdationDateTimeString: string | null;

  constructor() {
    this.taskStatusDetailID = null;
    this.taskID = null;
    this.taskStatusID = null;
    this.description = null;
    this.userID = null;
    this.taskstatus = new TaskStatus();
    this.user = null;
    this.statsUpdationDateTimeString = null;
  }
}
