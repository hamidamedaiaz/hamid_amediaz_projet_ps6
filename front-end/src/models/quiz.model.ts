import { Question } from './question.model';  // Importation du modèle Question

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];  // Liste des questions du quiz
}
