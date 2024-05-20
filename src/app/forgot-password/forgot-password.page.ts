import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  

  constructor(private router: Router, private http: HttpClient) { }
  goBack(){
    this.router.navigate(['/login2'])
  }


  ngOnInit() {
  }

}
