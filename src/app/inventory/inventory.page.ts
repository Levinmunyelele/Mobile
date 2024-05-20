import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventoryData: any[] = [];

  constructor(private navCtrl: NavController) { }
  navigateToInventoryForm() {
    this.navCtrl.navigateForward('/inventory-form');
  }

  ngOnInit() {
  }

  addToInventory(formData: any) {
    this.inventoryData.push(formData);
  }
}
