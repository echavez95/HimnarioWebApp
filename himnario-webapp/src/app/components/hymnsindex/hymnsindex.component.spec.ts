import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HymnsindexComponent } from './hymnsindex.component';

describe('HymnsindexComponent', () => {
  let component: HymnsindexComponent;
  let fixture: ComponentFixture<HymnsindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HymnsindexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HymnsindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
