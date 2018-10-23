import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = 'https://www.hatchways.io/api/assessment/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
}
