import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


declare var M: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {//filling out an empty tokenpayload by default
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    emailAddress: '',
    age: ''
  }
  constructor(private auth: AuthenticationService, private router: Router, private httpClient: HttpClient) { }
 
  ngOnInit() {
  
  }

  register(){
    if(!this.auth.register(this.credentials)){
           M.toast({ html: 'Username and/or email address has already been taken, pick different ones', classes: 'rounded'});
           
    }else{
            this.auth.register(this.credentials).subscribe(() => {
            this.router.navigateByUrl('/profile');//redirect to profile page once 
            //registered
            }, (err) => {
            console.error(err);
           });
    }
  
  
  }

  }


