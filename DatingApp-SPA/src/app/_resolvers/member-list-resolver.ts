import {Injectable} from '@angular/core';
import { User } from '../_models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// So we don't require to use the 'safe navigation operators' (user?.knownAs) in the MemberDetails component
// We use Resolve on User

// Resolver is that intermediate code, which can be executed when a link has been clicked and before a component is loaded.
// General Routing Flow:
// 1. User clicks the link.
// 2. Angular loads the respective component. (Get errors if no values are defined in the User object so ended up using the user?.knownAs
//    work around)

// Routing Flow with Resolver:
// 1. User clicks the link.
// 2. Angular executes certain code and returns a value or observable.
// 3. Now you can load your component.
@Injectable()
export class MemberListResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    // ActivatedRouteSnapshot from Routes.ts
    // Go out to userService get route that matches route params & fetch the data before the component load
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        debugger;
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null); // of is a type of observable
            })
        );
    }
}
