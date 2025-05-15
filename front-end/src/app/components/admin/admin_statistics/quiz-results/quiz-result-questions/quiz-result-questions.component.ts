import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionResult } from 'src/models/quiz-result.model';
import { Answer } from 'src/models/answer.model';
import { QuizListService } from 'src/services/quiz-list.service';

@Component({
  selector: 'app-quiz-result-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-result-questions.component.html',
  styleUrls: ['./quiz-result-questions.component.scss']
})
export class QuizResultQuestionsComponent {
  @Input() questionResults: QuestionResult[] = [];

  constructor(private quizService: QuizListService) {}

  getScoreClass(isCorrect: boolean): string {
    return isCorrect ? 'correct' : 'incorrect';
  }

  isUserAnswer(answer: Answer, userAnswer: Answer | null): boolean {
    if (!userAnswer) return false;
    return answer.id === userAnswer.id && answer.questionId === userAnswer.questionId;
  }

  isCorrectAnswer(answer: Answer, correctAnswer: Answer): boolean {
    return answer.id === correctAnswer.id && answer.questionId === correctAnswer.questionId;
  }

  getAllPossibleAnswers(result: QuestionResult): Answer[] {
    const quizzes = this.quizService.quizzes$.getValue();
    for (const quiz of quizzes) {
      const question = quiz.questions.find(q => q.id === result.questionId);
      if (question) {
        return [...question.answers];
      }
    }


    const answers: Answer[] = [result.correctAnswer];
    if (result.userAnswer && !this.isCorrectAnswer(result.userAnswer, result.correctAnswer)) {
      answers.push(result.userAnswer);
    }
    return answers;
  }
}
