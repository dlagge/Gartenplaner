import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewplantpopupComponent } from '../newplantpopup/newplantpopup.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'newplantbutton',
  standalone: true,
  imports: [CommonModule, NewplantpopupComponent, AppComponent],
  templateUrl: './newplantbutton.component.html',
  styleUrl: './newplantbutton.component.css'
})

export class NewplantbuttonComponent {

  newplantbuttonstate: string = 'not_touched';
  visible: boolean = false;

  constructor(private app: AppComponent) { }

  setVisible(visibility: boolean) {
    this.visible = visibility;
  }

  @HostListener('click', ['$event'])
  onClick(event: { target: any; }) {
    if (event.target.className == 'addplantbutton' && this.newplantbuttonstate === 'not_touched') {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
        this.newplantbuttonstate = 'touched';
      }
    }

    if (event.target.className == 'newplantpopupwindowclose') {
      this.newplantbuttonstate = 'not_touched';
    }

    if (event.target.className == 'addplantbutton' && this.visible === false && this.newplantbuttonstate === 'touched') {
      this.newplantbuttonstate = 'not_touched';
      this.app.setMeshBlank();
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: { target: any; }) {
    if (event.target.className == 'addplantbutton') {
      this.app.setMeshHide();
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: { target: any; }) {
    if (event.target.className == 'addplantbutton') {
      this.app.setMeshVisible();
    }
  }
}
