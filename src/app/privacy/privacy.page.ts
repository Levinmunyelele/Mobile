import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MessageTemplateService } from '../services/message-template.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  messageTemplateId: number | undefined;
  messageTemplate: { subject: string; message: string; } | undefined;

  goBack(){
    this.location.back()
  }

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageTemplateService,
    private router : Router,
    private location:Location
  ) { }

  ngOnInit() {
    this.fetchMessageTemplate();
  }

  fetchMessageTemplate() {
    this.messageService.fetchMessageTemplateForPage('privacy').subscribe(
      (template: { subject: any; message: any; }) => {
        this.messageTemplate = {
          subject: template.subject,
          message: template.message
        };
      },
      (error: any) => {
        console.error('Error fetching message template:', error);
      }
    );
  }
}