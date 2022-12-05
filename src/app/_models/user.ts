export class User {
	id?: number;
	username?: string;
	password?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	is_superuser?: boolean;
	is_staff?: boolean;
	is_active?: boolean;
	date_joined?: string;
	last_login?: string;
}
export class LoginResponse {
	token: string;
	user: User;
}
