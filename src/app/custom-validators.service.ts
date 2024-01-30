import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(private loginService: LoginService) {}

  public minimumAgeValidator(minAge: number): ValidatorFn {
    // console.log('Entering minimumAgeValidator ');
    return (control: AbstractControl): ValidationErrors | null => {
      // console.log('Checking control.value ');
      if (!control.value) {
        return null; // *return if the Date Of Birth is null
      }
      // console.log(`control value = ${control.value}`);

      let today = new Date();
      let dateOfBirth = new Date(control.value);
      let diffMilliSeconds = Math.abs(today.getTime() - dateOfBirth.getTime());
      let diffYears = diffMilliSeconds / (1000 * 60 * 60 * 24) / 365.25;

      // console.log(`dateOfBirth = ${dateOfBirth}`);

      // console.log(`diffYears ${diffYears}`);

      if (diffYears >= minAge) {
        // console.log('Entered if');
        return null; // *valid
      } else {
        // console.log('Entered else');
        return { minAge: { valid: false } }; // *invalid
      }
    };
  }

  public compareValidator(
    controlToValidate: string,
    controlToCompare: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!(formGroup.get(controlToValidate) as FormControl).value) {
        return null; // *return if the confirm password is null
      }

      if (
        (formGroup.get(controlToValidate) as FormControl).value ==
        (formGroup.get(controlToCompare) as FormControl).value
      ) {
        return null; // *valid
      } else {
        (formGroup.get(controlToValidate) as FormControl).setErrors({
          compareValidator: { valid: false },
        });
        return { compareValidator: { valid: false } }; // * invalid
      }
    };
  }

  public DuplicateEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.loginService.getUserByEmail(control.value).pipe(
        map((existingUser: any) => {
          if (existingUser != null) {
            control.setErrors({ uniqueEmail: { valid: false } });
            return { uniqueEmail: { valid: false } }; //*invalid
          } else {
            return null; //*valid
          }
        })
      );
    };
  }
}
