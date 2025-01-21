export interface UserQuestion {
  userId: number;
  questionId: number;
  correct: boolean;
  confidenceLevel: 'UNFAMILIAR' | 'LOW' | 'MEDIUM' | 'ENOUGH' | 'HIGH';
}
