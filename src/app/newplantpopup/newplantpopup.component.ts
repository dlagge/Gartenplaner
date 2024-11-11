import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewplantpopuptileComponent } from '../newplantpopuptile/newplantpopuptile.component';

@Component({
  selector: 'newplantpopup',
  standalone: true,
  imports: [CommonModule, NewplantpopuptileComponent],
  templateUrl: './newplantpopup.component.html',
  styleUrl: './newplantpopup.component.css'
})
export class NewplantpopupComponent {
  @Output() showPlantPopup = new EventEmitter();

  newplantbuttonclosestate: string = 'close_not_touched';
  plantnameinput: string = '';

  @HostListener('click', ['$event'])
  onClick(event: { target: any; }) {
    if (event.target.className == 'newplantpopupwindowclose' || event.target.id == 'plantimg') {
      this.showPlantPopup.emit(false);
    }
    if (event.target.className.includes('labelbutton')) {
      this.plantnameinput = this.plantnameinput + event.target.innerHTML + ',';
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: { target: any; }) {
    if (event.target.className == 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_touched';
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: { target: any; }) {
    if (event.target.className != 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_not_touched';
    }
  }
}
