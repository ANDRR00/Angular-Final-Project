import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationToTicketListService {
  private heroDataSource = new BehaviorSubject<any>(null);
  currentHeroData = this.heroDataSource.asObservable();

  constructor() { }

  changeHeroData(data : any){
    this.heroDataSource.next(data);
  }
}
