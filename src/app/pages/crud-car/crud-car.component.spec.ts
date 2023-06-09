import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCarComponent } from './crud-car.component';

describe('CrudCarComponent', () => {
  let component: CrudCarComponent;
  let fixture: ComponentFixture<CrudCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
