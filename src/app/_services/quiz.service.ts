import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User, QuizzesResponse, Quiz } from '../_models';

@Injectable({
	providedIn: 'root',
})
export class QuizService {
	constructor(private router: Router, private http: HttpClient) {
		
	}

	get_quizzes() {
		return this.http.get<QuizzesResponse>(`${environment.apiUrl}/api/quizzes/`);
	}

	get_students() {
		return this.http.get<User[]>(`${environment.apiUrl}/api/students/`)
	}

	delete_quiz(quiz_id: number) {
		return this.http.delete<{ deleted: boolean }>(
			`${environment.apiUrl}/api/quizzes/${quiz_id}`
		);
	}

	add_quiz(quiz: Quiz) {
		return this.http.post<Quiz>(`${environment.apiUrl}/api/quizzes/`, quiz)
	}
	get_categories() {
		return this.http.get<Array<{id:string | null; hr_name: string}>>(`${environment.apiUrl}/api/categories/`)
	}

	get_difficulties() {
		return this.http.get<Array<{id:string | null; hr_name: string}>>(`${environment.apiUrl}/api/difficulties/`)
	}
}
