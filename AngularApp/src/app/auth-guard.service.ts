import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate{
    
  constructor(private auth: AuthenticationService, private router: Router) { }
  
  canActivate(){
    if(!this.auth.isLoggedIn()){//checking if user is logged in using the authentication service
        this.router.navigateByUrl('/');//if not logged in redirect to home page(home component)
        return false;
    }
    return true;
  }
}
