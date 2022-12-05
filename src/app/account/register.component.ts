import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			first_name: [''],
			last_name: [''],
			email: ['', [Validators.email, Validators.required]],
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			password2: ['', [Validators.required, Validators.minLength(6)]],
			is_staff: [false, Validators.required],
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;

		// reset alerts on submit
		this.alertService.clear();

		// stop here if form is invalid
		if (this.form.invalid) {
			this.alertService.error('Invalid form.',{autoClose: true})
			return;
		}

		this.loading = true;
		this.accountService
			.register(this.form.value)
			.pipe(first())
			.subscribe({
				next: () => {
					this.alertService.success('Registration successful', {
						keepAfterRouteChange: true,
					});
					this.router.navigate(['../login'], { relativeTo: this.route });
				},
				error: (error) => {
					this.alertService.error(error);
					this.loading = false;
				},
			});
	}
}
