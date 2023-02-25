import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-four',
  templateUrl: './tab-four.component.html',
  styleUrls: ['./tab-four.component.scss'],
})
export class TabFourComponent {
  @Input()
  user: any;
}
