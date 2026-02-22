import * as THREE from 'three';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { NewplantlabelComponent } from '../newplantlabel/newplantlabel.component';
import { AppComponent } from '../app.component';

@Component({
    selector: 'newplantpopuptile',
    imports: [NewplantlabelComponent],
    templateUrl: './newplantpopuptile.component.html',
    styleUrl: './newplantpopuptile.component.css'
})
export class NewplantpopuptileComponent {
  @Input() source: string = "";
  @Input() title: string = "";
  @Output() labelClicked = new EventEmitter();

  sour: string | undefined;
  titl: string | undefined;

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.sour = 'assets/plant_images/' + this.source + '.png';
    this.titl = this.title;
  }

  @HostListener('click', ['$event'])
  onClick(event: { target: any; }) {
    if (event.target.id == 'plantimg') {
      this.app.camera.setCameraPositionDefault();
      this.app.controls.getControls().target.set(-2.499297762341835, -3.916147334965456, 1.3931736218334798);
      this.app.controls.getControls().update();
      this.app.createModel(this.source, true);
      document.body.style.cursor = 'none';
    }
  }
}
