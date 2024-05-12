import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedValue: any;

  constructor() { }

  setSharedValue(value: any) {
    this.sharedValue = value;
  }

  getSharedValue() {
    return this.sharedValue;
  }
}
