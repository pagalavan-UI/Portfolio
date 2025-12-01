import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartdealComponent } from './smartdeal.component';

describe('SmartdealComponent', () => {
  let component: SmartdealComponent;
  let fixture: ComponentFixture<SmartdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartdealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
