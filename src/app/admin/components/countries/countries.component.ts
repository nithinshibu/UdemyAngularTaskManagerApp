import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Country } from '../../../models/country.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../../services/countries.service';
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit {
  //* Objects for holding the model data
  countries: Country[] = [];
  showingLoading: boolean = false;

  newformSubmitted = false;
  editformSubmitted = false;

  //* Objects for delete
  deleteCountry: Country = new Country();
  editIndex!: number;
  deleteIndex!: number;

  //* Properties for Searching
  searchBy: string = 'countryName';
  searchText: string = '';

  //* Properties for Paging
  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  //* Reactive Forms

  newForm!: FormGroup;
  editForm!: FormGroup;

  //* AutoFocus TextBoxes
  @ViewChild('defaultTextBox_New') defaultTextBox_New!: ElementRef;
  @ViewChild('defaultTextBox_Edit') defaultTextBox_Edit!: ElementRef;
  @ViewChild('newFormCancel') newFormCancel!: ElementRef;
  @ViewChild('editFormCancel') editFormCancel!: ElementRef;

  constructor(
    private countriesService: CountriesService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    //* Get data from database
    this.countriesService.getCountries().subscribe({
      next: (response: Country[]) => {
        this.countries = response;
        this.showingLoading = false;
        this.calculateNoOfPages();
      },
    });

    //* Create the newForm
    this.newForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required]),
    });

    //* Create the editForm
    this.editForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required]),
    });
  }
  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(
      this.countries,
      this.searchBy,
      this.searchText
    );

    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(pageIndex: number) {
    if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.currentPageIndex = pageIndex;
    }
  }

  onNewClick(event: any) {
    //* reset the new form
    this.newForm.reset({ countryID: 0 });
    setTimeout(() => {
      // * Focus the client location textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick() {
    this.newformSubmitted = true;
    if (this.newForm.valid) {
      this.countriesService.insertCountry(this.newForm.value).subscribe({
        next: (response) => {
          //* Add the response to the GRID
          var p: Country = new Country();
          p.countryID = response.countryID;
          p.countryName = response.countryName;
          this.countries.push(p);

          //* Reset the new form
          this.newForm.reset();
          this.newFormCancel.nativeElement.click();
          this.calculateNoOfPages();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onEditClick(event: any, country: Country) {
    //* Reset the editForm
    this.editForm.reset();

    setTimeout(() => {
      //* Set data into editForm
      this.editForm.patchValue(country);
      this.editIndex = this.countries.indexOf(country);

      //* Focus the client location textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick() {
    this.editformSubmitted = true;
    if (this.editForm.valid) {
      this.countriesService.updateCountry(this.editForm.value).subscribe({
        next: (response: Country) => {
          //* Update the response in the Grid
          this.countries[this.editIndex] = response;
          //* Reset the editForm
          this.editForm.reset();
          this.editFormCancel.nativeElement.click();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onDeleteClick(event: any, country: Country) {
    //* Set data into delete Country
    this.deleteCountry.countryID = country.countryID;
    this.deleteCountry.countryName = country.countryName;
    this.deleteIndex = this.countries.indexOf(country);
  }

  onDeleteConfirmClick() {
    this.countriesService
      .deleteCountry(this.deleteCountry.countryID)
      .subscribe({
        next: (response) => {
          //* Delete the object in the Grid
          this.countries.splice(this.deleteIndex, 1);

          //* Clear delete country
          this.deleteCountry = new Country();

          //* Recalculate the pages
          this.calculateNoOfPages();
        },
        error: (err) => {},
      });
  }
  onSearchTextChange(event: any) {
    //* Recalculate the calculateNoOfPages
    this.calculateNoOfPages();
  }
}
