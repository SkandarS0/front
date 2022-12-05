import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Question } from '../_models';
import { AccountService } from '../_services';
import { QuestionService } from '../_services/question.service';

@Component({
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {

	questions?:Array<Question>

	get user(){
		return this.accountService.userValue
	}
	constructor(private accountService: AccountService, private questionService: QuestionService) { }

	ngOnInit(): void {
		this.getQuestions()
	}

	getQuestions(){
		this.questionService.get_questions().pipe(first())
		.subscribe((questionsResponse) => {
			this.questions = questionsResponse;
		});
	}
}
