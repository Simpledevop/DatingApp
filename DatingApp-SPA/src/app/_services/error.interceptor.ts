import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // So we don't have to catch indvidual errors that might occur with an httpRequest
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {

        if (error.status === 401) {
            return throwError(error.statusText);
        }
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
        }
        // To show user friendly errors in console...e.g, modal state error.. validation failed...length of field..or username exists...
        // instead of drilling through the exception object in the console, this will be show the nice bits of the exception.
        const serverError = error.error;
        let modalStateErrors = '';
        if (serverError && typeof serverError === 'object' ) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modalStateErrors += serverError[key] + '\n';
                }
            }
        }
        return throwError(modalStateErrors || serverError || 'Server Error');
    }));
  }
}

// Ussually Provider is used for Dependency Injection of Services but also can be used to intercept Http Requests.
// Tell the ng_module Provider an object with some options how to handle this specific provider. In this case
// it's a type of Http_Interceptor which intercept http request and detects and custom handles any errors.
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
