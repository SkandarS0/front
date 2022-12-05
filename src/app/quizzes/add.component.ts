import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { Title } from '@angular/platform-browser';
import { QuizService } from '../_services/quiz.service';
import { User } from '../_models';

@Component({ templateUrl: 'add.component.html' })
export class AddComponent implements OnInit {
	form!: FormGroup;
	id?: string;
	loading = false;
	submitting = false;
	submitted = false;
	categories?:Array<{id:string | null; hr_name: string}>
	difficulties?:Array<{id:string | null; hr_name: string}>
	students?:Array<User>
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private quizService: QuizService,
		private alertService: AlertService,
		private title: Title
	) {
		quizService.get_categories().subscribe((respone) => {
			this.categories = respone
		})
		quizService.get_difficulties().subscribe((respone) => {
			this.difficulties = respone
		})
	}

	ngOnInit() {
		this.title.setTitle('Add Quiz')
		this.form = this.formBuilder.group({
			count: ['', Validators.required],
			category: [null, ],
			difficulty: [null, ],
			students: [null,]
			
		});
		this.quizService.get_students().subscribe({
			next: (respone) => {
				this.students = respone
			}
		})
		this.id = this.route.snapshot.params['id'];
	}

	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;

		this.alertService.clear();
		
		if (this.form.invalid) {
			return;
		}

		this.submitting = true;
		this.quizService.add_quiz(this.form.value).pipe(first()).subscribe({
			next: () => {
				this.alertService.success("Quiz added successfully.")
				this.router.navigateByUrl('/quizzes');
			},
			error: (error)=>{
				this.alertService.error("Error occured"+ error)
				this.submitting = false;
			}
		})
	}

}
