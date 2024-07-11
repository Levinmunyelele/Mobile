import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventoryData: any[] = [];

  constructor(private navCtrl: NavController ,private router: Router, private httpclient: HttpClient) { }
  navigateToInventoryForm() {
    this.navCtrl.navigateForward('/inventory-form');
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/facilities/facilityhome']);
  }

  addToInventory(formData: any) {
    this.inventoryData.push(formData);
  }
}
