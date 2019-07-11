import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { Products } from 'src/app/interfaces/products';
import { Transactions } from 'src/app/interfaces/transactions';
import { Locations } from 'src/app/interfaces/locations';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  locId: number;
  locName: string;
  productList: Products[];
  transactionList: Transactions[];
  locations: Locations[];
  newLocation;
  
  constructor(private getData : GetDataService) { }

  ngOnInit() {
    this.getLocations()
  }

  addLocation(){
    this.newLocation = {
      name : this.locName
    }
    this.getData.addLocation(this.newLocation).subscribe(
      loc => {
        this.getLocations();
        this.locName = "";
      }
      
    )
  }

  deleteLocation(loc){
      this.getData.deleteLocation(loc.id).subscribe(
        loc => {
          this.getLocations();
        }
      )
  }

  getLocations(){
    this.getData.getLocations().subscribe(
      (loc: Locations[]) => {
        this.locations = loc;
      }
    )
  }
  getProducts(){
    this.getData.getAllProducts().subscribe(
      (data: Products[]) => this.productList = data.map(
        p => { 
          if(p.id == 2){
            p.name = "Shakir"
          }
          return p;
        }
      )
    )
  } 

  getTransactions() {
    
    // this.getData.getAllTransactions().subscribe(
    //   (data: Transactions[]) => {
    //     this.transactionList = data.map(
    //       t => {
    //         t.cost = 600;
    //         return t;
    //       }
    //     )
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )

    this.getData.getAllTransactions().subscribe(
      (data: Transactions[]) => {
        this.transactionList = data.map(
          (t, index) => {
            if(index == 2){
              t.cost = 400;
            }
            return t;
          }
        )
      }
    )
  }
}
