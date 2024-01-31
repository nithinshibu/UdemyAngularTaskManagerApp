import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country.model';
import { CustomValidatorsService } from '../custom-validators.service';
import { SignUpViewModel } from '../sign-up-view-model.model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {
  signUpForm!: FormGroup;
  genders = ['Male', 'Female'];
  countries: Country[] = [];
  formSubmitted = false;
  registerError: string | null = null;
  canLeave: boolean = true;
  constructor(
    private countriesService: CountriesService,
    private formBuilder: FormBuilder,
    private customValidatorsService: CustomValidatorsService,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((response) => {
      this.countries = response;
    });
    this.signUpForm = this.formBuilder.group(
      {
        personName: this.formBuilder.group({
          firstName: [null, [Validators.required, Validators.minLength(2)]], //default value=null
          lastName: [null, [Validators.required, Validators.minLength(2)]],
        }),
        email: [
          '',
          [Validators.required, Validators.email],
          [this.customValidatorsService.DuplicateEmailValidator()],
          { updateOn: 'blur' },
        ],
        mobile: [
          null,
          [Validators.required, Validators.pattern(/^[789]\d{9}$/)],
        ],
        dateOfBirth: [
          null,
          [
            Validators.required,
            this.customValidatorsService.minimumAgeValidator(18),
          ],
        ],
        password: ['', [Validators.required]],
        confirmPassword: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        countryID: [null, [Validators.required]],
        receiveNewsLetter: [false],
        skills: this.formBuilder.array([]),
      },
      {
        validators: [
          this.customValidatorsService.compareValidator(
            'confirmPassword',
            'password'
          ),
        ],
      }
    );

    this.signUpForm.valueChanges.subscribe((value) => {
      this.canLeave = false;
    });
  }

  onSubmitClick() {
    this.formSubmitted = true;
    // console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel).subscribe({
        next: (response) => {
          this.canLeave = true;
          this.router.navigate(['/employee', 'tasks']);
        },
        error: (err) => {
          console.log(err);
          this.registerError = 'Unable to submit';
        },
      });
    }
  }
  onAddSkill() {
    var formGroup = this.formBuilder.group({
      skillName: [null, [Validators.required]],
      skillLevel: [null, [Validators.required]],
    });
    (<FormArray>this.signUpForm.get('skills')).push(formGroup);
  }
  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }
  get skillsControls() {
    return (<FormArray>this.signUpForm.get('skills')).controls;
  }
}
