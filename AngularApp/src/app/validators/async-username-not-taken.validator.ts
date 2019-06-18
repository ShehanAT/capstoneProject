import { AbstractControl} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import 'rxjs/add/operator/map';

export class ValidateUsernameNotTaken{
    static createValidator(auth: AuthenticationService ){
        return (control: AbstractControl) => {
            return auth.checkUsernameNotTaken(control.value).map(res => {
              return res.usernameNotTaken ? null : {usernameTaken: true};
            });
        }
    }
}