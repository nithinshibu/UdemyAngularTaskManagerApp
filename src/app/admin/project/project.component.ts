import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Project } from '../../project.model';
import { ProjectsService } from '../../projects.service';
import { Subscription } from 'rxjs';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  @Input('currentProject') project!: Project;
  @Input('recordIndex') i!: number;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  MySubscription!: Subscription;

  hideDetails: boolean = false;

  constructor(public projectsService: ProjectsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('----ngOnChanges called');
    // for (let propName in changes) {
    //   let chng = changes[propName];
    //   let cur = JSON.stringify(chng.currentValue);
    //   let prev = JSON.stringify(chng.previousValue);
    //   console.log(`${propName}:currentValue= ${cur}, previousValue=${prev}`);
    // }
  }

  ngOnInit(): void {
    this.MySubscription = this.projectsService.MySubject.subscribe((hide) => {
      this.hideDetails = hide;
    });
  }

  onEditClick(event: any, i: number) {
    this.editClick.emit({ event, i });
  }
  onDeleteClick(event: any, i: any) {
    this.deleteClick.emit({ event, i });
  }

  ngOnDestroy() {
    this.MySubscription.unsubscribe();
  }

  @ContentChild('selectionBox') selectionBox!: CheckBoxPrinterComponent;

  isAllCheckedChange(b: boolean) {
    if (b) {
      this.selectionBox.check();
    } else {
      this.selectionBox.unCheck();
    }
  }
}
