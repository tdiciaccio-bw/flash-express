export default interface Card {
	id: number;
	answer: string;
	question: string;
	easiness: number;
	correctStreak: number;
	nextDueDate: Date;
	deckId: number;	
}
