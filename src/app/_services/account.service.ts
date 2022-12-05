import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoginResponse, User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
	private userSubject: BehaviorSubject<User | null>;
	private userTokenSubject: BehaviorSubject<string | null>;
	public user: Observable<User | null>;
	public token: Observable<string | null>;

	constructor(private router: Router, private http: HttpClient) {
		this.userSubject = new BehaviorSubject(
			JSON.parse(sessionStorage.getItem('user')!)
		);
		this.userTokenSubject = new BehaviorSubject(
			JSON.parse(sessionStorage.getItem('token')!)
		);
		this.user = this.userSubject.asObservable();
		this.token = this.userTokenSubject.asObservable();
	}

	public get userValue() {
		return this.userSubject.value;
	}

	public get userTokenValue() {
		return this.userTokenSubject.value;
	}

	login(username: string, password: string) {
		return this.http
			.post<LoginResponse>(`${environment.apiUrl}/api/login/`, {
				username,
				password,
			})
			.pipe(
				map((response) => {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					sessionStorage.setItem('user', JSON.stringify(response.user));
					sessionStorage.setItem('token', JSON.stringify(response.token));
					this.userSubject.next(response.user);
					this.userTokenSubject.next(response.token);
					return response.user;
				})
			);
	}

	logout() {
		// remove user from local storage and set current user to null
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');
		this.userSubject.next(null);
		this.userTokenSubject.next(null);
		this.router.navigate(['/account/login']);
	}

	register(user: User) {
		return this.http.post(`${environment.apiUrl}/api/register/`, user);
	}
}
