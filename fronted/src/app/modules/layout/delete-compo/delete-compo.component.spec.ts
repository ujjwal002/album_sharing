import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompoComponent } from './delete-compo.component';

describe('DeleteCompoComponent', () => {
  let component: DeleteCompoComponent;
  let fixture: ComponentFixture<DeleteCompoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCompoComponent]
    });
    fixture = TestBed.createComponent(DeleteCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
