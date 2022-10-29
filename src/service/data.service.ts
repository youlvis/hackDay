import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl='https://mqjl9s6vf4.execute-api.eu-west-1.amazonaws.com/prod/v1/hackday/public/event'
  constructor(private http: HttpClient ) { 


  }

  getData() {
    return this.http
    .get(this.baseUrl)
  }
}
