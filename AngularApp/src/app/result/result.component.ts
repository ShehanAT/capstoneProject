import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SearchPicsComponent } from '../search-pics/search-pics.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @ViewChild(SearchPicsComponent, {static: false}) child;
  @ViewChild('galleryRef', {static: false}) galleryElementRef: ElementRef;
  @Input() imageData: Array<any>;
  constructor( private renderer: Renderer2, private elementRef: ElementRef ) { }

  ngOnInit() {
    console.log("HELLO");
  }
  onClick(){
    console.log("HELLO");
   /** var target = event.target || event.srcElement || event.currentTarget;
   console.log(target.attributes.src); **/
  }
  
  recieveMessage($event){
    this.imageData = $event;
    console.log(this.imageData);
    const image = this.renderer.createElement('img');
    image.setAttribute('src', this.imageData);
    this.renderer.listen(image.nativeElement, 'click', (event) => {
        console.log("Hello!");
    });
this.renderer.appendChild(this.galleryElementRef.nativeElement, image);

    
  }
  


  ngAfterViewInit(){

  }

}

