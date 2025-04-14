import { Question } from './question.model'; 

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[]; 
}
