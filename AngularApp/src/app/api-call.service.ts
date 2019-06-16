import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface ImageDetails{
    source: string;
}

export interface imageTag{
    tag: string;
}
interface flickrCallResponse{
    images: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private images: string;
  constructor(private http: HttpClient, private router: Router) { }
  private saveImages(images: string): void{
    localStorage.setItem('mean-image', images);
    this.images = images;
  }
  private request(method: 'post'|'get', type:'sendImageTag'|'showResult', tag?: imageTag){
    let base;
    if(method === 'post'){
        base = this.http.post('/api/sendImageTag', tag);
    }else{
   
    }
    
    const request = base.pipe(
        map((data: flickrCallResponse) => {
            if(data.images){
                this.saveImages(data.images);
            }
            return data;
        })
        );
        return request;
        
  }
  
  public sendImageTag(tag: imageTag): Observable<any>{
    return this.request('post','sendImageTag', tag);
  
  }
  public showResults(): Observable<any>{
    return this.request('get', 'showResult');
  }
  
}
