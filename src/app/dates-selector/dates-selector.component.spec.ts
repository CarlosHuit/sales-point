import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesSelectorComponent } from './dates-selector.component';

describe('DatesSelectorComponent', () => {
  let component: DatesSelectorComponent;
  let fixture: ComponentFixture<DatesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
