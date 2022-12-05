import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Quiz } from '../_models';

import { AccountService, AlertService } from '../_services';
import { QuizService } from '../_services/quiz.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
	quizzes?: Quiz[];
	isDeleting ?: boolean;
	constructor(
		private accountService: AccountService,
		private quizService: QuizService,
		public alertService: AlertService
	) {}

	get user() {
		return this.accountService.userValue;
	}

	ngOnInit() {
		this.getQuizzes()
	}

	getQuizzes(){
		this.quizService
			.get_quizzes()
			.pipe(first())
			.subscribe((quizResponse) => {
				this.quizzes = quizResponse;
			});
	}

	deleteQuiz(quiz_id: number) {
		let quiz = this.quizzes.find((value, index)=> {
			return value.id == quiz_id
		})
		this.quizService.delete_quiz(quiz_id).pipe(first()).subscribe({
			next: (response) => {
				quiz.isDeleting = true
				this.alertService.success("Quiz deleted successfully", {autoClose: true})
				this.getQuizzes()
			},
			error: (err) => {
				this.alertService.error("Problem occured.", {autoClose: true})
			},
		});
	}
}
