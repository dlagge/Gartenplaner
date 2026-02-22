import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/uiservice';

@Component({
  selector: 'newplantlabel',
  imports: [CommonModule],
  templateUrl: './newplantlabel.component.html',
  styleUrl: './newplantlabel.component.css'
})
export class NewplantlabelComponent {
  @Input() labeltitle: string = "";
  @Input() labelparent: string = "";
  @Input() source = '';

  title: string = "";
  labelstate: string = 'label_not_touched';

  constructor(private sel: UiService) { }

  ngOnInit() {
    this.title = this.labeltitle;
  }

  clickbutton(event: PointerEvent) {
    if (event.button === 0) {
      this.sel.pick(this.labeltitle);
    }
  }

  buttonhoverin() {
    this.labelstate = 'label_touched';
  }

  buttonhoverout() {
    this.labelstate = 'label_not_touched';
  }
}
