import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public counter: number = 0;

  loadInitialCount() {}
  mergeCountWithExistingUser() {}

  incrementCount() {}

  modifyCount() {}

  removeFromCount() {}

  constructor() {
    // this.counter =
  }
}
