import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/uiservice';
import { Subject, takeUntil } from 'rxjs';
import { AppComponent } from '../app.component';
import { NewplantpopupComponent } from '../newplantpopup/newplantpopup.component';

@Component({
  selector: 'newplantbutton',
  imports: [CommonModule, NewplantpopupComponent],
  templateUrl: './newplantbutton.component.html',
  styleUrl: './newplantbutton.component.css'
})

export class NewplantbuttonComponent {

  newplantbuttonstate: string = 'not_touched';
  private destroy$ = new Subject<void>();
  isOpen = false;

  constructor(private app: AppComponent, private uiservice: UiService) {
    this.uiservice.closePopup$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.close());
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clickbutton(event: PointerEvent) {
    if (event.button !== 0) return;
    if (this.isOpen) {
      this.close();
      this.newplantbuttonstate = 'not_touched';
    } else if (this.newplantbuttonstate === 'touched') {
      this.newplantbuttonstate = 'not_touched';
      this.app.setMeshBlank();
      document.body.style.cursor = 'auto';
    } else if (this.newplantbuttonstate === 'not_touched') {
      this.open();
      this.newplantbuttonstate = 'touched';
    }
  }

  buttonhoverin() {
    this.app.setMeshHide();
  }

  buttonhoverout() {
    this.app.setMeshVisible();
  }
}
