import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {
  private pageMessageMapping: { [key: string]: number } = {
    'about-us': 3, 
    'privacy': 2,
    'terms-nconditions': 1, 
  };

  constructor(private http: HttpClient) { }

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
    return this.http.get<any>(`http://qualipharmapi.local/v1/message-templates/view?id=${id}`);
  }
}
