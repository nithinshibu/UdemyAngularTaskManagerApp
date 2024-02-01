import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit {
  message: string = '';
  constructor() {}
  ngOnInit(): void {}
}
