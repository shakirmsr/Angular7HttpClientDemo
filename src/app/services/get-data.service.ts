import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locations } from 'src/app/interfaces/locations';
import { Products } from '../interfaces/products';
import { Transactions } from '../interfaces/transactions';
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

  // addLocations(name: string, quantity: number){
  //   let _image: Blob;
  //   const _data = new FormData();
  //   _data.append('name', name);
  //   _data.append('image', _image)
  //   _data.append('quantity', quantity.toString());
  //   return this.http.post<Locations[]>(this.baseUrl + '/locations', _data )
  // }
  addProduct(product:Products){
    return this.http.post<Products[]>(this.baseUrl + '/products', product )
  }

  // addLocation(id: number, name: string){
  //   return this.http.post(this.baseUrl + '/locations', {id, name} )
  // }

  addTransaction(transaction: Transactions){
    return this.http.post<Products[]>(this.baseUrl + '/transactions', transaction )
  }

  deleteLocation(loc: number){
    return this.http.delete(this.baseUrl + "/locations/" + loc)
  }

  deleteProduct(prod: number){
    return this.http.delete(this.baseUrl + "/products/" + prod)
  }

  deleteTransaction(trans: number){
    return this.http.delete(this.baseUrl + "/transactions/" + trans)
  }
}
