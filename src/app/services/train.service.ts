import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http : HttpClient) { }

  getTrains() : Observable<any>{
    const url = `${this.apiUrl}/trains`;
    return this.http.get<any>(url);
  }
}
