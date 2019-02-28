import { Injectable } from '@angular/core';
declare let alertify: any; // Already imported via our angular.json file..this just tells ts.lint not to give errors if we make use of it.

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {  // So we can inject this service into componenets to use the different methods here, 
// which are wrappers around existing javascript methods (Alertify)
  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else { }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
