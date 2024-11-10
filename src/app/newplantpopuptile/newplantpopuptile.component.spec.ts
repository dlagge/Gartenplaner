import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplantpopuptileComponent } from './newplantpopuptile.component';

describe('NewplantpopuptileComponent', () => {
  let component: NewplantpopuptileComponent;
  let fixture: ComponentFixture<NewplantpopuptileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewplantpopuptileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplantpopuptileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
