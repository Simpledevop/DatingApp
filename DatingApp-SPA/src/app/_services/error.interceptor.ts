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
    provide: HTTP_INTERCEPTORS, // Add the class to the Http_Interceptors array, this is angular array of http inteceptor classes that
    useClass: ErrorInterceptor, // will get fired when a request is called. So by , default yours will just run as added to
    // provider stack behaviour...e.g. do Http Interception ..e.g, may want to change headers..jwt token in request or response.
    // Then provider stack behaviour does Dependency Injection of registered interfaces.
    multi: true  // Tells angular that HTTP_Interceptors may already have a class called ErrorInteceptor...but multi says use last one
    // registered into the provider.. this is for extending..override existing class.
    // https://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html
};
