import { User } from './user';

class Answer {
	id: number;
	string: string;
	isCorrect: boolean;
}

export class Question {
	id: number;
	answers: Array<Answer>;
	category?: {
		id: string;
		hr_name: string;
	};
	difficulty?: {
		id: string;
		hr_name: string;
	};
}

export class Quiz {
	id?: number;
	teacher?: User;
	max_count?: number;
	category?: {
		id: string;
		hr_name: string;
	};
	difficulty?: {
		id: string;
		hr_name: string;
	};
	questions?: Array<Question>;
	questions_count?:number;
	isDeleting?: boolean;
}
export class QuizzesResponse extends Array<Quiz> {}
