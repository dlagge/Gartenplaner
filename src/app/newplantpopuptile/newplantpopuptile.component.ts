import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewplantlabelComponent } from '../newplantlabel/newplantlabel.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'newplantpopuptile',
  standalone: true,
  imports: [CommonModule, NewplantlabelComponent, AppComponent],
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
      this.app.createModel(this.source);
    }
  }
}
