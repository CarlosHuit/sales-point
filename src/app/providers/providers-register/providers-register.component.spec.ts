import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersRegisterComponent } from './providers-register.component';

describe('ProvidersRegisterComponent', () => {
  let component: ProvidersRegisterComponent;
  let fixture: ComponentFixture<ProvidersRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
