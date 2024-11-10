import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplantlabelComponent } from './newplantlabel.component';

describe('NewplantlabelComponent', () => {
  let component: NewplantlabelComponent;
  let fixture: ComponentFixture<NewplantlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewplantlabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplantlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
