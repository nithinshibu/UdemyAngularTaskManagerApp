import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentLoaderDirective } from '../../../directives/component-loader.directive';
import { CountriesComponent } from '../countries/countries.component';
import { ClientLocationsComponent } from '../client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../task-status/task-status.component';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss',
})
export class MastersComponent implements OnInit {
  masterMenuItems = [
    {
      itemName: 'Countries',
      displayName: 'Countries',
      component: CountriesComponent,
    },
    {
      itemName: 'ClientLocations',
      displayName: 'Client Locations',
      component: ClientLocationsComponent,
    },
    {
      itemName: 'TaskPriorities',
      displayName: 'Task Priorities',
      component: TaskPrioritiesComponent,
    },
    {
      itemName: 'TaskStatus',
      displayName: 'Task Status',
      component: TaskStatusComponent,
    },
  ];
  activeItem!: string;
  tabs: any = [];
  @ViewChildren(ComponentLoaderDirective) componentLoaders:
    | QueryList<ComponentLoaderDirective>
    | any = null;
  constructor() {}
  ngOnInit(): void {}

  menuItemClick(clickedMasterMenuItem: any) {
    this.activeItem = clickedMasterMenuItem.itemName;

    let matchingTabs = this.tabs.filter((tab: any) => {
      return tab.itemName == clickedMasterMenuItem.itemName;
    });

    if (matchingTabs.length == 0) {
      this.tabs.push({
        itemName: clickedMasterMenuItem.itemName,
        displayName: clickedMasterMenuItem.displayName,
      });
      setTimeout(() => {
        const componentLoadersArray = this.componentLoaders.toArray();
        const viewContainerRef =
          componentLoadersArray[this.tabs.length - 1].viewContainerRef;

        // Clear the view container before creating a new component
        viewContainerRef.clear();

        // Use DynamicChildLoaderDirective directly to create the component
        viewContainerRef.createComponent(clickedMasterMenuItem.component);
      }, 100);
    }
  }
}
