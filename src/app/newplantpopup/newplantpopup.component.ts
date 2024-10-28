import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'newplantpopup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newplantpopup.component.html',
  styleUrl: './newplantpopup.component.css'
})
export class NewplantpopupComponent {
  newplantbuttonclosestate: string = 'close_not_touched';

  @HostListener("click")
  onClick(){
    console.log("clicked");  
  }

  @HostListener('mouseover',['$event'])
  onMouseOver(event: {fromElement: any;}) {
    if(event.fromElement.id == 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_touched';
    } 
  }

  @HostListener('mouseout',['$event'])
  onMouseOut(event: { fromElement: {id: string;};}) {
    if(event.fromElement.id != 'newplantpopupwindowclose') {
      this.newplantbuttonclosestate = 'close_not_touched';
    }
  }
}
