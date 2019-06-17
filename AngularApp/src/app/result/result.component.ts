import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SearchPicsComponent } from '../search-pics/search-pics.component';
import { ApiCallService, imageTag } from '../api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
   counter : number = 0;
   public searchStart = false;
  @ViewChild(SearchPicsComponent, {static: false}) child;
   @ViewChild('galleryRef1', {static: false}) galleryElementRef1: ElementRef;
   @ViewChild('galleryRef2', {static: false}) galleryElementRef2: ElementRef;
   @ViewChild('galleryRef3', {static: false}) galleryElementRef3: ElementRef;
   @ViewChild('galleryRef4', {static: false}) galleryElementRef4: ElementRef;
   @ViewChild('galleryRef5', {static: false}) galleryElementRef5: ElementRef;
   @ViewChild('galleryRef6', {static: false}) galleryElementRef6: ElementRef;
   @ViewChild('galleryRef7', {static: false}) galleryElementRef7: ElementRef;
   @ViewChild('galleryRef8', {static: false}) galleryElementRef8: ElementRef;
   @ViewChild('galleryRef9', {static: false}) galleryElementRef9: ElementRef;
   @ViewChild('ocrWordsRef', {static: false}) ocrWordsElementRef: ElementRef;
  @Input() imageData: Array<any>;
  constructor( private renderer: Renderer2, private elementRef: ElementRef, private apiCall: ApiCallService, private router: Router ) { }

  ngOnInit() {
  }
  imageUrl: imageTag = {
    tag: ''
  }
  
  wordList: string = '';
  onClick(event){
    this.wordList = 'Extracted Words: ';
    var target = event.target || event.srcElement || event.currentTarget;
    this.imageUrl.tag = target.attributes.id.value;//saving image url in a string var
    this.apiCall.sendOCRData(this.imageUrl).subscribe((data) => {
        var obj = JSON.parse(data.data);
        try{
            for(var i = 0 ; i < obj.regions[0].lines.length ; i++){
                for(var j = 0 ; j < obj.regions[0].lines[i].words.length ; j++ ){
                    this.wordList += (obj.regions[0].lines[i].words[j].text) + ", ";
                }  
            }
        }catch(err){
            this.wordList += 'No words were found!';
        }
        
    }, (err) => {
        console.error(err);
    });
  }
  
  recieveMessage($event){
    this.searchStart = true;
    this.counter++;
    this.imageData = $event;
    switch(this.counter){
        case 1: this.galleryElementRef1.nativeElement.setAttribute('src', this.imageData);
        this.galleryElementRef1.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 2:
        this.galleryElementRef2.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef2.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 3:
        this.galleryElementRef3.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef3.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 4:
        this.galleryElementRef4.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef4.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 5:
        this.galleryElementRef5.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef5.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 6:
        this.galleryElementRef6.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef6.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 7:
        this.galleryElementRef7.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef7.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 8:
        this.galleryElementRef8.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef8.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        case 9:
        this.galleryElementRef9.nativeElement.setAttribute('src', this.imageData);
           this.galleryElementRef9.nativeElement.setAttribute('id', 
        this.imageData);
        break;
        default:
        this.counter = 0;
        break;
    }
    
  }
  
  ngAfterViewInit(){

  }

}

