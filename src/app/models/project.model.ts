import { ClientLocation } from './client-location.model';

export class Project {
  projectID: number | any;
  projectName: string | any;
  dateOfStart: string | any;
  teamSize: number | any;
  active: boolean | any;
  status: string | any;
  clientLocationID: number | any;
  clientLocation: ClientLocation | any;

  // Add an index signature to allow string indexing
  [key: string]: number | string | boolean | any;

  constructor() {
    this.projectID = 0;
    this.projectName = null;
    this.dateOfStart = null;
    this.teamSize = null;
    this.active = false;
    this.status = null;
    this.clientLocationID = null;
    this.clientLocation = new ClientLocation();
  }
}
