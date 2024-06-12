import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartureService } from '../../services/departure.service';
import { CommonModule } from '@angular/common';
import { DeleteService } from '../../services/delete.service';
import { DeleteAllService } from '../../services/delete-all.service';
import { ReservationToTicketListService } from '../../services/reservation-to-ticket-list.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TrainListToTicketsService } from '../../services/train-list-to-tickets.service';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit, OnDestroy {

  from: string = "";
  to: string = "";
  date: string = "";
  heroData: any;
  departures: any[] = [];
  subscription: Subscription | undefined;
  vagonList: any[] = [];
  trainId: number | null = null;
  filteredVagonList: any[] = [];
  selectedSeats: any[] = [];
  showPopup: boolean = false;
  showCardPopup: boolean = false;

  selectedTicket: any = null;
  selectedVagon: any = null;
  selectedSeatsForVagon: any[] = [];

  userEmail: string = '';
  userTelephone: string = '';
  userData: any = {};
  formData: any = {};

  constructor(
    private departureService: DepartureService,
    private deleteService: DeleteService,
    private deleteAllService: DeleteAllService,
    private reservationToListService: ReservationToTicketListService,
    private trainListToTicketsService: TrainListToTicketsService
  ) {}

  ngOnInit(): void {
    this.saveData();
    this.updateData();
    this.getDepartures();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  saveData() {
    this.subscription = this.reservationToListService.currentHeroData.subscribe(data => {
      this.heroData = { ...this.heroData, ...data };
    });
  }

  updateData() {
    this.from = this.heroData.from;
    this.to = this.heroData.to;
    this.date = this.heroData.date;
  }

  getDepartures(): void {
    this.departureService.getDepartures(this.from, this.to, this.date).subscribe(item => {
      this.departures = item[0].trains.map((train: any) => ({ ...train, collapsed: false }));
      // console.log("Departures:", this.departures);
      this.vagonList = [];
      this.departures.forEach(departure => {
        this.vagonList = this.vagonList.concat(departure.vagons);
      });
      // console.log("Vagon list:", this.vagonList);
    });
  }

  // deleteTicket(id: number): void {
  //   this.departures = this.departures.filter(item => item.id !== id);
  //   this.deleteService.deleteTicket(id).subscribe();
  // }

  // deleteAllTickets(): void {
  //   this.departures = [];
  //   this.deleteAllService.deleteAllTickets().subscribe();
  // }

  collapseItems(item: any): void {
    item.collapsed = !item.collapsed;
    if (item.collapsed) {
      this.trainId = item.id;
      this.filteredVagonList = this.vagonList.filter(vagon => vagon.trainId === this.trainId);
    } else {
      this.trainId = null;
      this.filteredVagonList = [];
    }
  }

  selectSeat(vagon: any, seat: any): void {
    const seatInfo = {
      number: seat.number,
      price: seat.price,
      seatId: seat.seatId,
      vagonId: vagon.id
    };
    
    if (!seat.selected) {
      console.log(`Selected seat: Vagon ${vagon.name}, Seat ${seat.number}`);
      seat.selected = true;
      this.selectedSeats.push(seatInfo);
    } else {
      console.log(`Deselected seat: Vagon ${vagon.name}, Seat ${seat.number}`);
      seat.selected = false;
      this.selectedSeats = this.selectedSeats.filter(s => s.seatId !== seat.seatId);
    }
  }

  anySeatsSelected(): boolean {
    return this.selectedSeats.length > 0;
  }

  saveUserInfo(): void {  
    this.userEmail = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
    this.userTelephone = (document.querySelector('input[type="tel"]') as HTMLInputElement).value;
  
    console.log('User Email:', this.userEmail);
    console.log('User Telephone:', this.userTelephone);
    this.showPopup = false;
    this.showCardPopup = true;
  }


  buyTicket(item: any, vagon: any): void {
    this.selectedSeatsForVagon = this.selectedSeats.filter(s => s.vagonId === vagon.id);
    if (this.selectedSeatsForVagon.length > 0) {
      console.log(`Buying tickets for train ${item.name} Express, Vagon ${vagon.name}:`, this.selectedSeatsForVagon);
      console.log('Selected Vagon:', vagon);
      this.showPopup = true;

      this.selectedTicket = item;
      this.selectedVagon = vagon;

    } else {
      console.log('No seats selected. Cannot proceed to buy ticket.');
      this.showPopup = false;
    }
  }

  saveTicketData() {
    this.subscription = this.trainListToTicketsService.formData .subscribe(data => {
      this.formData = { ...this.formData, ...data };
    });
  }

  finalBuy(): void {
    const formData = {
      userEmail: this.userEmail,
      userTelephone: this.userTelephone,
      selectedTicket: this.selectedTicket,
      selectedVagon: this.selectedVagon,
      selectedSeats: this.selectedSeatsForVagon
    };

    this.saveTicketData();

    this.trainListToTicketsService.addFormData(formData);


    this.showCardPopup = false;
  }
  

  
}
