import { Component, OnInit, Renderer2, Directive, ViewChild, Input, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ApiCallService, imageTag } from '../api-call.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-pics',
  templateUrl: './search-pics.component.html',
  styleUrls: ['./search-pics.component.css']
})

export class SearchPicsComponent implements OnInit, AfterViewInit {
    potentialTags: imageTag = {
        tag: ''
    }
    
    imageData: string;

  constructor(private apiCall: ApiCallService, private router: Router) { }
  @Output() sendDataEvent = new EventEmitter<string>();
  ngOnInit() {
  }
  ngAfterViewInit(){
  }
 
  sendAndGetImages(){
    this.apiCall.sendImageTag(this.potentialTags).subscribe((data) => {
        
        
       // console.log(this.imageData.data[0]);
       for(var i = 0; i < 10 ; i++){
            this.imageData = data.data[i];
            this.sendDataEvent.emit(this.imageData)
       }
  
    
    }, (err) => {
        console.error(err);
    });
  }

}
