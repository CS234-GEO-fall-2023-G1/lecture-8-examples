import { Component } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';
import { Student, StudentsService } from '../students.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students-management',
  templateUrl: './students-management.component.html',
  styleUrls: ['./students-management.component.css']
})
export class StudentsManagementComponent {
  public students: Student[] = [];

  public editingStudent?: Student; 

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    personalNumber: new FormControl('', Validators.required)
  });

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    personalNumber: new FormControl('', Validators.required)
  });

  searchField = new FormControl('');

  searchText$ = new BehaviorSubject('');
  searchResults$: Observable<Student[]>;

  addStudent(){
    this.studentService.addStudent({
      id: '',
      name: this.addForm.value.name,
      personalNumber: this.addForm.value.personalNumber
    }).subscribe((e) => {
      this.loadStudents();
    });
  }

  editStudent(student: Student){
    this.editingStudent = student;
    // setTimeout(() => {
    // this.editForm.setValue({
    //   name: this.editingStudent?.name,
    //   personalNumber: this.editingStudent?.personalNumber
    // });
    // }, 0);

    this.editForm.setValue({
      name: this.editingStudent?.name,
      personalNumber: this.editingStudent?.personalNumber
    });
  }

  cancelEditStudent(){
    this.editingStudent = undefined;
  }

  updateStudent(){
    this.studentService.updateStudent({
      id: this.editingStudent!.id,
      name: this.editForm.value.name,
      personalNumber: this.editForm.value.personalNumber
    }).subscribe(d => {
      this.editingStudent = undefined;
      this.loadStudents();
    })
  }

  deleteStudent(id: string){
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    })
    
  }

  loadStudents(){
    this.studentService.getStudents().subscribe(d => {
      this.students = d;
    });
  }

  constructor(private studentService: StudentsService) { }

  ngOnInit(): void {

    // this.studentService.signIn().subscribe(d => {
    //   console.log(d);
    // });

    // this.studentService.register().subscribe(d => {
    //   console.log(d);
    // });

    this.loadStudents();

    this.searchResults$ = this.searchText$.pipe(
      debounceTime(500),
      switchMap(query => this.studentService.findStudentByName(query))
    );

    this.searchField.valueChanges.subscribe(this.searchText$);
  }
}
