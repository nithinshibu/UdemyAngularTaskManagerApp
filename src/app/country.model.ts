export class Country {
  countryID: number = 0;
  countryName: string = '';
  constructor(countryIDParam: number, countryNameParam: string) {
    this.countryID = countryIDParam;
    this.countryName = countryNameParam;
  }
}
