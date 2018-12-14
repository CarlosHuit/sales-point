import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionsRegisterComponent } from './devolutions-register.component';

describe('DevolutionsRegisterComponent', () => {
  let component: DevolutionsRegisterComponent;
  let fixture: ComponentFixture<DevolutionsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolutionsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolutionsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
