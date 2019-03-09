import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { CanActivate } from '@angular/router/src/utils/preactivation';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    // provide a single root and this dummy root will have child roots that you want to protect with AuthGuard
    {
        path: '',  // this means nothing, but if want to get to members path
                   // it will be '' nothing + 'members' and it will match
                   // if path was path: 'dummy' then to get chlld path it will be 'localhost:4200/dummymembers'
        runGuardsAndResolvers: 'always', // We've created a Guard so lets use it,
        canActivate: [AuthGuard],
        children: [ // Array of child roots
            { path: 'members', component: MembersListComponent}, // , canActivate: [AuthGuard]}, -- now a child and handled by dummy root
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent},
        ]
    },
    // redirect to '' will mean redirect to '' above which will take you home component.
    { path: '**', redirectTo: '', pathMatch: 'full'}, // Ordering is important with wildcard ** as if it was top of
];                                                    // the list it would match earlier and other paths would not match
