import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private accountService: AccountService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// add auth header with token if user is logged in and request is to the api url
		const user = this.accountService.userValue;
		const token = this.accountService.userTokenValue;
		const isUser = user;
		const isApiUrl = request.url.startsWith(environment.apiUrl);
		if (isUser && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Token ${token}`,
				},
			});
		}

		return next.handle(request);
	}
}
