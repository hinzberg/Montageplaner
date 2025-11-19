import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public countries: { name: string; capital: string }[] = [];

  constructor() {
    this.countries = [
      { name: 'Deutschland', capital: 'Berlin' },
      { name: 'Frankreich', capital: 'Paris' },
      { name: 'Italien', capital: 'Rom' },
      { name: 'Spanien', capital: 'Madrid' },
      { name: 'Japan', capital: 'Tokio' },
      { name: 'Kanada', capital: 'Ottawa' },
      { name: 'Australien', capital: 'Canberra' }
    ];
  }
}
