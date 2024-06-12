import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TrainListToTicketsService } from '../../services/train-list-to-tickets.service';
import { DeleteService } from '../../services/delete.service';
import { DeleteAllService } from '../../services/delete-all.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  formStatus: boolean = false;

  constructor(
    private trainListToTicketsService: TrainListToTicketsService,
    private deleteService: DeleteService,
    private deleteAllService: DeleteAllService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.trainListToTicketsService.formData.subscribe(data => {
      this.tickets = data;
      console.log('Received Form Data in TicketComponent:', this.tickets);

      this.isEmpty(this.tickets);
    });
  }

  isEmpty(arr: any[]): void {
    if (arr.length > 0) {
      console.log("The tickets array is not empty.");
      this.formStatus = true;
    } else {
      console.log("The tickets array is empty.");
      this.formStatus = false;
    }
  }
  
  generatePDF(index: number) {
    const containerId = `ticket-container-${index}`;
    const elementToPrint = document.getElementById(containerId);
    if (elementToPrint) {
      html2canvas(elementToPrint, { 
        width: 800,
        height: 1200,
        scale: 2
      }).then((canvas) => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save(`ticket_${index}.pdf`);
      });
    } else {
      console.error(`Element with id '${containerId}' not found`);
    }
  }
  

  deleteTicket(index: number): void {
    if (index >= 0 && index < this.tickets.length) {
      this.tickets.splice(index, 1);
    }
    this.deleteService.deleteTicket(index).subscribe();
    this.isEmpty(this.tickets);
    console.log(this.formStatus);
  }

  deleteAllTickets(): void {
    this.tickets.splice(0, this.tickets.length);
    this.isEmpty(this.tickets);
    this.deleteAllService.deleteAllTickets().subscribe(() => {

      this.getData();
    });
  }
  
}
