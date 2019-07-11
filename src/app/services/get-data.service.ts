import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locations } from 'src/app/interfaces/locations';
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

  getLocations() {
    return this.http.get(this.baseUrl + '/locations')
  }

  addLocation(location){
    return this.http.post<Locations[]>(this.baseUrl + '/locations', location )
  }

  // addLocation(id: number, name: string){
  //   return this.http.post(this.baseUrl + '/locations', {id, name} )
  // }
  deleteLocation(loc){
    return this.http.delete(this.baseUrl + "/locations/" + loc)
  }
}
