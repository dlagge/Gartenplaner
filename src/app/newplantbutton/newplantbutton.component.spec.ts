import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplantbuttonComponent } from './newplantbutton.component';

describe('NewplantbuttonComponent', () => {
  let component: NewplantbuttonComponent;
  let fixture: ComponentFixture<NewplantbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewplantbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplantbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
