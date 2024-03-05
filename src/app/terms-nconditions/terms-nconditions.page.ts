import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageTemplateService } from '../message-template.service';

@Component({
  selector: 'app-terms-nconditions',
  templateUrl: './terms-nconditions.page.html',
  styleUrls: ['./terms-nconditions.page.scss'],
})
export class TermsNconditionsPage implements OnInit {
  messageTemplateId: number | undefined;
  messageTemplate: { subject: string; message: string; } | undefined;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageTemplateService
  ) { }

  ngOnInit() {
    this.fetchMessageTemplate();
  }

  fetchMessageTemplate() {
    this.messageService.fetchMessageTemplateForPage('terms-nconditions').subscribe(
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