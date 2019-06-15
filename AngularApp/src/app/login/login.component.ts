
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    username: '',
    password: ''
  };
  
  constructor(private auth: AuthenticationService, private router: Router) { }
  ngOnInit(){
  
  }
  login(){
    this.auth.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/profile');//redirect to profile
        //once user authenticated 
    }, (err) => {
        console.error(err);//else print err message
    });
  }


}
