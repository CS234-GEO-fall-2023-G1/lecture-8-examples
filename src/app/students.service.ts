import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }


  private url = 'http://localhost:3000/students';

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  public addStudent(student: Student) {
    student.id = uuidv4();
    return this.http.post<Student>(this.url, student);
  }

  public updateStudent(student: Student) {
    return this.http.put<Student>(`${this.url}/${student.id}`, student);
  }

  public deleteStudent(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public findStudentByName(name: string) {
    return this.http.get<Student[]>(this.url, {
      params: new HttpParams().set('name_like', name)
    });
  }

  public signIn() {
    // let user = {
    //   "email": "olivier@mail.com",
    //   "password": "bestPassw0rd"
    // }
    // return this.http.post<any>('http://localhost:3000/login', user);
  }

  public register() {
    // let user = {
    //   email: "nino@mail.com",
    //   password: "bestPassw0rd"
    // }
    // return this.http.post<any>('http://localhost:3000/signup', user);
  }
}


export interface Student {
  id: string;
  name: string;
  personalNumber: string;
}