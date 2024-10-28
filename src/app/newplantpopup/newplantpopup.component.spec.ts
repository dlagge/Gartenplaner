import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplantpopupComponent } from './newplantpopup.component';

describe('NewplantpopupComponent', () => {
  let component: NewplantpopupComponent;
  let fixture: ComponentFixture<NewplantpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewplantpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplantpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
