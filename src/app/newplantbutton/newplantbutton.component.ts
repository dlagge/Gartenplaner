import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'newplantbutton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newplantbutton.component.html',
  styleUrl: './newplantbutton.component.css'
})
export class NewplantbuttonComponent {
  newplantbuttonstate: string = 'not_touched';

  @HostListener("click")
  onClick(){
    console.log("clicked");  
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.newplantbuttonstate = 'touched';
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.newplantbuttonstate = 'not_touched';
  }
}
