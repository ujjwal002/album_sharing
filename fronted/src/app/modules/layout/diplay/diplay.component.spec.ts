import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayComponent } from './diplay.component';

describe('DiplayComponent', () => {
  let component: DiplayComponent;
  let fixture: ComponentFixture<DiplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplayComponent]
    });
    fixture = TestBed.createComponent(DiplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
