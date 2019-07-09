import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  baseUrl:string = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  getAllProducts(){
    return this.http.get(this.baseUrl + '/products')
  }
  getAllTransactions() {
    return this.http.get(this.baseUrl + '/transactions')
  }
}
