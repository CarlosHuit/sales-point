import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExistenceComponent } from './query-existence.component';

describe('QueryExistenceComponent', () => {
  let component: QueryExistenceComponent;
  let fixture: ComponentFixture<QueryExistenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryExistenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
