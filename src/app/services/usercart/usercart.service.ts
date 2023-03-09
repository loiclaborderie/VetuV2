import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsercartService {
  public cartFetched = false;
  public dataLoaded = false;
  constructor() {}
}
