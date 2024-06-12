import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http : HttpClient) { }
  
  deleteTicket(id : number) : Observable<void>{
    const url = `${this.apiUrl}/tickets/cancle/${id}`;
    return this.http.delete<void>(url);
  }
}
