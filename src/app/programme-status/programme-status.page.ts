import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programme-status',
  templateUrl: './programme-status.page.html',
  styleUrls: ['./programme-status.page.scss'],
})
export class ProgrammeStatusPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  programs = [
    { name: 'Family Planning', status: 'approved', description: 'Description of Family Planning' },
    { name: 'HIV', status: 'pending', description: 'Description of HIV' },
    { name: 'MOH 647', status: 'not reported', description: 'Description of MOH 647' },
    { name: 'Malaria', status: 'approved', description: 'Description of Malaria' },
    { name: 'TB', status: 'not reported', description: 'Description of TB' }
  ];

  getStatusColor(status: string) {
    switch (status) {
      case 'approved':
        return 'card-green';
      case 'pending':
        return 'card-amber';
      default:
        return 'card-red';
    }
  }

}
