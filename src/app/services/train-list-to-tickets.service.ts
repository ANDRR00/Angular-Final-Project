import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainListToTicketsService {
  private formDataSubject = new BehaviorSubject<any[]>([]);
  formData = this.formDataSubject.asObservable();

  constructor() {}

  addFormData(data: any) {
    const currentData = this.formDataSubject.value;
    this.formDataSubject.next([...currentData, data]);
  }
}
