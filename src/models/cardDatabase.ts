export interface Card {
	id: number;
	answer: string;
	question: string;
	easiness: number;
	correct_streak: number;
	next_due_date: Date;
	deck_id: number;	
}
