import { Component, OnInit, Renderer2, Directive, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
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
    let refreshImages : boolean = false;
  @ViewChild('galleryRef', {static: false}) galleryElementRef: ElementRef;
  constructor(private apiCall: ApiCallService, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
   /** const d2 = this.renderer.createElement('p');
    const image = this.renderer.createText('Hello');
    this.renderer.appendChild(d2, image);
    this.renderer.appendChild(this.galleryElementRef.nativeElement, d2);**/
  }
  sendAndGetImages(){
   /** if(this.refreshImages){
        this.renderer.removeChild(this.galleryElementRef.nativeElement, image)
    }**/
    this.apiCall.sendImageTag(this.potentialTags).subscribe((data) => {
        console.log(data.data[0]);
        for(var i = 0; i < data.data.length ; i++){
            const image = this.renderer.createElement('img');
            image.setAttribute('src', data.data[i]);
            this.renderer.appendChild(this.galleryElementRef.nativeElement, image);
            this.refreshImages = true;
        }
        /**this.router.navigateByUrl('/imageResults');//redirect to profile page
        **/
    }, (err) => {
        console.error(err);
    });
  }

}
