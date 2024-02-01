import { CanDeactivateFn } from '@angular/router';

export const CanDeactivateGuardService: CanDeactivateFn<unknown> = (
  component: any,
  currentRoute,
  currentState,
  nextState
) => {
  if (!component.canLeave) {
    return confirm('You have some unsaved details. Are you sure to go back?');
  }
  return true;
};
