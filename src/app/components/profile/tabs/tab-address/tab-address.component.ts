import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-address',
  templateUrl: './tab-address.component.html',
  styleUrls: ['./tab-address.component.scss'],
})
export class TabAddressComponent {
  @Input()
  user: any;

  testConsole() {
    console.log(this.user);
  }
}
