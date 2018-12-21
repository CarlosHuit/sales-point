import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAddProductComponent } from './purchase-add-product.component';

describe('PurchaseAddProductComponent', () => {
  let component: PurchaseAddProductComponent;
  let fixture: ComponentFixture<PurchaseAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
