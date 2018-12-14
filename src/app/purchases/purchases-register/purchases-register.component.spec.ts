import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesRegisterComponent } from './purchases-register.component';

describe('PurchasesRegisterComponent', () => {
  let component: PurchasesRegisterComponent;
  let fixture: ComponentFixture<PurchasesRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
