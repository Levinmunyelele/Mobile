import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';
import { LoginService } from '../services/login.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public logoutService: LogoutService, public router: Router, public loginService:LoginService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				this.logoutService.logout();
					this.router.navigateByUrl('/login2');
				
			}

			const error = err.error.message || err.error.detail || err.statusText;
			return throwError(error);
		}));
	}
}
