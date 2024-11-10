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
  @Output() changeEvent = new EventEmitter();
  newplantbuttonclosestate: string = 'close_not_touched';

  @HostListener('click',['$event'])
  onClick(event: {target: any;}){
    if(event.target.className == 'newplantpopupwindowclose') {
      this.changeEvent.emit(false);
    } 
  }

  @HostListener('mouseover',['$event'])
  onMouseOver(event: {target: any;}) {
    if(event.target.className == 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_touched';
    } 
  }

  @HostListener('mouseout',['$event'])
  onMouseOut(event: {target: any;}) {
    if(event.target.className != 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_not_touched';
    }
  }
}
