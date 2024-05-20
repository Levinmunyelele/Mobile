import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-reports',
  templateUrl: './stock-reports.page.html',
  styleUrls: ['./stock-reports.page.scss'],
})
export class StockReportsPage implements OnInit {
  goBack() {
    this.router.navigate(['/dashboard'])
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
