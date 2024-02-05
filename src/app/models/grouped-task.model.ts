import { Task } from './task.model';

export class GroupedTask {
  taskStatusName: any;
  tasks: Task[] = [];

  constructor() {
    this.taskStatusName = null;
    this.tasks = [];
  }
}
