import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { Products } from 'src/app/interfaces/products';
import { Transactions } from 'src/app/interfaces/transactions';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  productList: Products[];
  transactionList: Transactions[];
  constructor(private getData : GetDataService) { }

  ngOnInit() {
  }

  getProducts(){
    this.getData.getAllProducts().subscribe(
      (data: Products[]) => this.productList = data.map(
        d => { 
          if(d.id == 2){
            d.name = "Shakir"
          }
          return d;
        }
      )
    )
  } 

  getTransactions() {
    // this.getData.getAllTransactions().subscribe(
    //   data => { this.transactionList = data
    //   console.log(this.transactionList);},
    //   error => console.log(error)
    // )
    this.getData.getAllTransactions().subscribe( 
      (data: Transactions[]) => {
        this.transactionList = data;
      },
      error => {
        console.log(error)
      }
    )
  }
}
