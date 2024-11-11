import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewplantpopupComponent } from '../newplantpopup/newplantpopup.component';

@Component({
  selector: 'newplantbutton',
  standalone: true,
  imports: [CommonModule, NewplantpopupComponent],
  templateUrl: './newplantbutton.component.html',
  styleUrl: './newplantbutton.component.css'
})

export class NewplantbuttonComponent {

  newplantbuttonstate: string = 'not_touched';
  visible: boolean = false;

  setVisible(visibility: boolean) {
    this.visible = visibility;
  }

  @HostListener('click', ['$event'])
  onClick(event: { target: any; }) {
    if (event.target.className == 'addplantbutton') {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: { target: any; }) {
    if (event.target.className == 'addplantbutton') {
      this.newplantbuttonstate = 'touched';
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: { target: any; }) {
    if (event.target.className == 'addplantbutton') {
      this.newplantbuttonstate = 'not_touched';
    }
  }
}
