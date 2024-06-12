import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private apiUrl = 'https://railway.stepprojects.ge/api';

  constructor(private http : HttpClient) { }

  getStations() : Observable<any> {
    const url = `${this.apiUrl}/stations`;
    return this.http.get<any>(url)
  }
}
