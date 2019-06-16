import { Component, OnInit } from '@angular/core';
import { ApiCallService, ImageDetails} from '../api-call.service';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.css']
})
export class ImageResultComponent implements OnInit {
    details: ImageDetails;
  constructor(private apiCall: ApiCallService) { }

  ngOnInit() {
 
  }

}
