import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

// CanDeactive is when we navigate away from an route (page), if all the conditions are true then yes, else prevent.
// Pass in the class Angular knows to pass the type to angular router base module that take in the type and then looks to
// call your canDeactive to do more specific child logic.
@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        debugger;
        if (component.editForm.dirty) {
            // Confirm javascript popup dialog return true if user clicks ok button and false if user clicks cancel button.
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
