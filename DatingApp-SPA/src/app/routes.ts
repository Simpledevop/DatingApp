import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MembersListComponent } from './members-list/members-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'members', component: MembersListComponent},
    { path: 'Messages', component: MessagesComponent},
    { path: 'lists', component: ListsComponent},
    { path: '**', redirectTo: 'home', pathMatch: 'full'}, // Ordering is important with wildcard ** as if it was top of
];                                                        // the list it would match earlier and other paths would not match
