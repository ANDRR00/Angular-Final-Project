import { Component } from '@angular/core';
import { StationService } from '../../services/station.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DepartureService } from '../../services/departure.service';
import { subscribe } from 'diagnostics_channel';
import { ReservationToTicketListService } from '../../services/reservation-to-ticket-list.service';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {

  heroData = {
    from : "",
    to : "",
    date : ''
  }

  stations : any = [];
  constructor(private stationService : StationService, private departureService : DepartureService,  private reservationToListService : ReservationToTicketListService ){ }

  getStations(){
    this.stationService.getStations().subscribe(stations => this.stations = stations);
  }

  ngOnInit() : void {
    this.getStations();
  }

  onSubmit(){
    console.log("reserved");
    console.log(this.heroData);
  }

  sendData(){
    this.reservationToListService.changeHeroData(this.heroData);
  }
  
}
