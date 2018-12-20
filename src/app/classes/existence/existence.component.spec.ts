import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceComponent } from './existence.component';

describe('ExistenceComponent', () => {
  let component: ExistenceComponent;
  let fixture: ComponentFixture<ExistenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
