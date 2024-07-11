import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.page.html',
  styleUrls: ['./programmes.page.scss'],
})
export class ProgrammesPage implements OnInit {
  programmes: { programmeName: string; active: string; }[] | undefined;

  goBack(){
    this.router.navigate(['/dashboard'])
  }

  constructor(private router:Router, private http:HttpClient) { }
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.fetchProgrammes();
  }

  fetchProgrammes() {
    this.http.get<any[]>('https://qualipharm-app.healthstrat.co.ke/api//v1/programmes')
      .subscribe(data => {
        this.programmes = data;
      });
  }
  getStatusColor(status: string): string {
    return status === 'Approved' ? 'success' : 'danger';
  }
}