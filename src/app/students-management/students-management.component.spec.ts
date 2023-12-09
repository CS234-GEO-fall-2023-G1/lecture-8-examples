import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsManagementComponent } from './students-management.component';

describe('StudentsManagementComponent', () => {
  let component: StudentsManagementComponent;
  let fixture: ComponentFixture<StudentsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsManagementComponent]
    });
    fixture = TestBed.createComponent(StudentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
