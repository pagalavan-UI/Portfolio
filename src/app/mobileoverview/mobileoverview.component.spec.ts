import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileoverviewComponent } from './mobileoverview.component';

describe('MobileoverviewComponent', () => {
  let component: MobileoverviewComponent;
  let fixture: ComponentFixture<MobileoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
