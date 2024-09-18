import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		// return from(this.userData.getToken()).pipe(switchMap(token => {
		const token = sessionStorage.getItem('token');
		
		if (request.url.includes('login')) {
			console.log("logging")
			return next.handle(request);
		}
// 
				const tokenUsed = (token) ? token : "null";
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${tokenUsed}`
					}
				});
				return next.handle(request);
			// })
		// );
	}
}
