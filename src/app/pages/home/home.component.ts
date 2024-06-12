import { Component } from '@angular/core';
import { ReservationComponent } from "../../components/reservation/reservation.component";
import { DecorationComponent } from "../../shared/decoration/decoration.component";
import { TrainService } from '../../services/train.service';
import { TicketsService } from '../../services/tickets.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ReservationComponent, DecorationComponent]
})
export class HomeComponent {

    trains : [] = [];
    tickets : [] = [];

    constructor(private trainService : TrainService, private ticketService : TicketsService) {}

    ngOnInit() : void{
        this.getTrains();
        this.getTickets();
    }

    getTrains() : void {
        this.trainService.getTrains().subscribe(trains => this.trains = trains);
    }

    getTickets(){
        this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
    }
}
