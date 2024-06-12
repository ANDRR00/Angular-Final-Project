import { Routes } from '@angular/router';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TrainListComponent } from './pages/train-list/train-list.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

    {path : "", component : HomeComponent},
    {path : "tickets", component : TicketsComponent},
    {path : "trainList", component : TrainListComponent},
    {path : "**", component : NotFoundComponent}

];
