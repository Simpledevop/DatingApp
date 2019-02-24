import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    // So we don't have to catch indvidual errors that might occur with an httpRequest
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
return next.handle(req).pipe(
    catchError(error => {
        if(error instanceOf HttpErrorResponse){
            const applicationError = error.header.get('Application-Error');
            if(applicationError){
                return throwError(applicationError);
            }
        }
    })
)
    }
}