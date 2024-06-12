import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteAllService {

  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http : HttpClient) { }

  deleteAllTickets() : Observable<void>{
    const url = `${this.apiUrl}/cancelAll`;

    return this.http.delete<void>(url);
  }
}