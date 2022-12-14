import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFormComponent } from './mapForm.component';

describe('MapFormComponent', () => {
  let component: MapFormComponent;
  let fixture: ComponentFixture<MapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
