import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsercartService {
  public userCartFetched = false;
  constructor() {}
}
