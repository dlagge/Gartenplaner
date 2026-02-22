import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiService } from '../../services/uiservice';
import { AppComponent } from '../app.component';
import { NewplantlabelComponent } from '../newplantlabel/newplantlabel.component';

@Component({
  selector: 'newplantpopuptile',
  standalone: true,
  imports: [NewplantlabelComponent],
  templateUrl: './newplantpopuptile.component.html',
  styleUrl: './newplantpopuptile.component.css'
})
export class NewplantpopuptileComponent {
  @Input() source: string = '';
  @Input() title: string = '';

  src: string = '';
  tit: string = '';

  constructor(private app: AppComponent, private uiservice: UiService) { }

  ngOnInit() {
    this.src = 'assets/plant_images/' + this.source + '.png';
    this.tit = this.title;
  }

  clickimage(event: PointerEvent) {
    if (event.button === 0) {
      this.uiservice.requestClosePopup();

      this.app.camera.setCameraPositionDefault();
      this.app.controls.getControls().target.set(-2.499297762341835, -3.916147334965456, 1.3931736218334798);
      this.app.controls.getControls().update();
      this.app.createModel(this.source, true);

      document.body.style.cursor = 'none';
    }
  }
}
