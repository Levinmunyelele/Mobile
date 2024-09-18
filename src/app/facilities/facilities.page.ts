import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.page.html',
  styleUrls: ['./facilities.page.scss'],
})
export class FacilitiesPage implements OnInit {
  
  constructor( private router:Router, ) { }
  
  
  ngOnInit() {
    
  }
  
} 
