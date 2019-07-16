import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { Products } from 'src/app/interfaces/products';
import { Transactions } from 'src/app/interfaces/transactions';
import { Locations } from 'src/app/interfaces/locations';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

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
  newLocation: Locations;
  newProduct: Products;
  newTransaction: Transactions;
  productAddForm: FormGroup;
  locationAddForm: FormGroup;
  locationAddFormSubmitted: boolean = false;
  productAddFormSubmitted: boolean = false;
  lSuccess: boolean = false;
  pSuccess: boolean = false;

  constructor(private getData: GetDataService, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getLocations();
    this.getProducts();
    this.getTransactions();

//Product form    
    this.productAddForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      product_cost: ['', Validators.required],
      product_quantity: ['', Validators.required],
    });

//Location form
    this.locationAddForm = this.formBuilder.group({
      location_name: ['', Validators.required]
    })
  }

//To add a Location
  addLocation(loc) {
    this.locationAddFormSubmitted = true;
    if (this.locationAddForm.invalid) {
      return;
    }
    this.newLocation = {
      name: loc
    }
    this.getData.addLocation(this.newLocation).subscribe(
      () => {
        this.getLocations();
        this.locationAddForm.reset();
        this.locationAddFormSubmitted = false;
        this.lSuccess = true;
        setTimeout(() => {
          this.lSuccess = false;
        }, 2000)
      }

    )
  }

//To add a product  
  addProducts(name: string, cost: number, quantity: number, form: HTMLFormElement) {
    this.productAddFormSubmitted = true;
    if (this.productAddForm.invalid) {
      return
    }
    this.newProduct = {
      cost: cost,
      name: name,
      quantity: quantity
    }
    this.getData.addProduct(this.newProduct).subscribe(
      () => {
        this.getProducts();
        form.reset();
        this.productAddFormSubmitted = false;
        this.pSuccess = true;
        setTimeout(() => {
          this.pSuccess = false;
        },2000)
      }

    )
  }

//To add a transaction
  addTransaction(cost: number, quantity: number, form: HTMLFormElement) {
    if (!(cost && quantity)) {
      return;
    }
    this.newTransaction = {
      cost: cost,
      quantity: quantity
    }
    this.getData.addTransaction(this.newTransaction).subscribe(
      () => {
        this.getTransactions();
        form.reset();
      }
    )
  }

  deleteProduct(product) {
    this.getData.deleteProduct(product.id).subscribe(
      () => {
        this.getProducts();
      }
    )
  }

  deleteLocation(loc: Locations) {
    this.getData.deleteLocation(loc.id).subscribe(() => { this.getLocations(); })
  }

  deleteTransaction(trans: Transactions) {
    this.getData.deleteTransaction(trans.id).subscribe(
      () => {
        this.getTransactions();
      }
    )
  }

  getLocations() {
    this.getData.getLocations().subscribe(
      (loc: Locations[]) => this.locations = loc
    )
  }
  getProducts() {
    this.getData.getAllProducts().subscribe(
      (data: Products[]) => this.productList = data.map(
        p => {
          if (p.id == 2) {
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
            if (index == 2) {
              t.cost = 400;
            }
            return t;
          }
        )
      }
    )
  }
}
