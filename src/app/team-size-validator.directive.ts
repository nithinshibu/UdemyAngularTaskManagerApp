import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TeamSizeValidatorDirective,
      multi: true,
    },
  ],
})
export class TeamSizeValidatorDirective implements Validator {
  constructor() {}
  @Input('appTeamSizeValidator') n: number | any = 0;
  validate(control: AbstractControl): ValidationErrors | null {
    let currentValue = control.value;
    //console.log(`current value ${currentValue}`);
    let isValid = currentValue % this.n == 0; //this.n

    if (isValid) {
      return null; //valid
    } else {
      return { divisible: { valid: false } }; //indicates invalid
    }
  }
}
