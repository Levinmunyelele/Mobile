import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Options, SeriesLineOptions } from 'highcharts';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedHospital: string;
  programs: { selectedProgram: string, selectedStatus: string }[];   
  

  viewInventoryItem() {
    this.router.navigate(['/inventory-item']); 
  }
  programs1: string[] = ['Family Planning', 'HIV', 'Malaria', 'MOH', 'Oxygen', 'TB'];


  constructor(private router: Router) {
    // Initialize selectedHospital and programs data
    this.selectedHospital = '';
    this.programs = [
      { selectedProgram: '', selectedStatus: '' } // Initialize the properties of each program object
    ];
    
  }  
  
  title = 'angular7-highcharts';

  highcharts = Highcharts;

  chartOptions: Options = {
    chart: {
      type: 'area', 
           
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Drug Usage for the months of dec,jan and feb'
    },
    xAxis: {
      categories: ['dec', 'jan', 'feb'],
      title: {
        text: 'months'
      },
    },
    yAxis: {
      title: {
        text: 'Dosage'
      },
    },
    series: [
      {
        name: 'Implants',
        data: [5, 7, 9, 13, 20]
      },
      {
        name: 'Contraceptives',
        data: [1, 6, 0, 11, 25]
      }
    ] as SeriesLineOptions[]
  };
}
