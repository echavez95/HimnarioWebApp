import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HymnComponent } from './hymn.component';

describe('HymnComponent', () => {
  let component: HymnComponent;
  let fixture: ComponentFixture<HymnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HymnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HymnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
