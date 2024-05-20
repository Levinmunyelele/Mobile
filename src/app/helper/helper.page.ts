import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-helper',
  templateUrl: './helper.page.html',
  styleUrls: ['./helper.page.scss'],
})
export class HelperPage implements OnInit {
  goBack(){
    this.router.navigate(['/dashboard'])
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
