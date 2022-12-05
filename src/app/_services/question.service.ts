import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Question } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  get_questions(){
	return this.http.get<Array<Question>>(`${environment.apiUrl}/api/questions`)
  }
}
