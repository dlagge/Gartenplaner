import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'newplantlabel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newplantlabel.component.html',
  styleUrl: './newplantlabel.component.css'
})
export class NewplantlabelComponent {
  @Input() labeltitle: string | undefined;

  title: string | undefined;
  labelstate: string = 'label_not_touched';

  ngOnInit() {
    this.title = this.labeltitle;
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.labelstate = 'label_touched';
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.labelstate = 'label_not_touched';
  }
}
