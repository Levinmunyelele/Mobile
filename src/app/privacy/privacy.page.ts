import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MessageTemplateService } from '../services/message-template.service';



@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  messageTemplateId: number | undefined;
  messageTemplate: { subject: string; message: string; } | undefined;

  goBack(){
    this.router.navigate(['/profile'])
  }

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageTemplateService,
    private router : Router
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