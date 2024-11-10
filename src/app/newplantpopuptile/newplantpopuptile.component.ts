import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewplantlabelComponent } from '../newplantlabel/newplantlabel.component';

@Component({
  selector: 'newplantpopuptile',
  standalone: true,
  imports: [CommonModule, NewplantlabelComponent],
  templateUrl: './newplantpopuptile.component.html',
  styleUrl: './newplantpopuptile.component.css'
})
export class NewplantpopuptileComponent {
  @Input() source: string = "";
  @Input() title: string = "";
  sour: string | undefined;
  titl: string | undefined;

  ngOnInit() {
    this.sour = this.source;
    this.titl = this.title;
  }

  @HostListener('click',['$event'])
  onClick(event: {target: any;}){
    if(event.target.id == 'plantimg') {
      // TODO
    } 
  }
}
