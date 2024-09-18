import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';  

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {
  private pageMessageMapping: { [key: string]: number } = {
    'about-us': 3, 
    'privacy': 2,
    'terms-nconditions': 1, 
  };

  constructor(private api: ApiService) { }  

  getMessageTemplateId(pageName: string): number | undefined {
    return this.pageMessageMapping[pageName];
  }

  fetchMessageTemplateForPage(pageName: string): Observable<any> {
    const messageId = this.getMessageTemplateId(pageName);
    if (!messageId) {
      throw new Error(`No message template ID found for page: ${pageName}`);
    }
    return this.fetchMessageTemplate(messageId);
  }

  private fetchMessageTemplate(id: number): Observable<any> {
   
    return this.api.get(`message-templates/view`, { id });
  }

  sendMessageTemplateData(payload: MessageTemplatePayload): Observable<any> {
   
    return this.api.post('message-templates/update', payload);
  }
}


export interface MessageTemplatePayload {
  id: number;
  templateName: string;
  content: string;
}
