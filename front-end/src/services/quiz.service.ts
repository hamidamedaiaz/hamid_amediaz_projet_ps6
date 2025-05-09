import { Injectable } from "@angular/core";
import { Question } from "src/models/question.model";
import { Quiz } from "src/models/quiz.model";
import { LocalStorageService } from "./localstorage.service";
import { Answer } from "src/models/answer.model";
import { BehaviorSubject, find, findIndex } from "rxjs";
import { EMPTY_QUESTION } from "src/mocks/question.mock"
import { Router } from "@angular/router";
import { GamemodeService } from "./gamemode.service";
import { EMPTY_QUIZ } from "src/mocks/quiz.mock";
import { QuizConfigurationService } from "./quizConfiguration.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public quiz: Quiz | null = null;
  public question: Question | undefined
  public questionId: number = 0;
  private givenCorrectAnswers: Answer[] = [];
  private readonly QUIZ_KEY = 'current_quiz';
  private readonly GIVEN_ANSWERS_KEY = 'current_score';
  private readonly QUESTION_ID_KEY = '0';
  private readonly IS_QUIZ_RUNNING_KEY = "is_quiz_running"
  public isQuizRunning = false;

  public question$: BehaviorSubject<Question> = new BehaviorSubject<Question>(EMPTY_QUESTION);
  public quiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(EMPTY_QUIZ);

  constructor(private localStorageService: LocalStorageService,
    private router: Router,
    private gamemodeService: GamemodeService,
    private quizConfigurationService: QuizConfigurationService) {

    this.loadFromStorage();
    this.question = this.quiz?.questions?.[this.questionId];
    if (this.question) this.question$.next(this.question);
  }

  private loadFromStorage(): void {
    const savedQuiz = this.localStorageService.getItem(this.QUIZ_KEY);
    const savedGivenAnswers = this.localStorageService.getItem(this.GIVEN_ANSWERS_KEY);
    const savedQuestionId = this.localStorageService.getItem(this.QUESTION_ID_KEY);
    const savedIsQuizRunning = this.localStorageService.getItem(this.IS_QUIZ_RUNNING_KEY)

    if (savedQuiz) {
      this.quiz = savedQuiz;
      this.quiz$.next(savedQuiz);
    }

    if (savedGivenAnswers !== null) {
      this.givenCorrectAnswers = savedGivenAnswers;
    }

    if (savedQuestionId) {
      this.questionId = savedQuestionId;
    }

    if (savedIsQuizRunning) this.isQuizRunning = savedIsQuizRunning;
  }

  public increaseScore(answer: Answer) {
    if (!this.givenCorrectAnswers.includes(answer)) {
      this.givenCorrectAnswers.push(answer);
      this.localStorageService.removeItem(this.GIVEN_ANSWERS_KEY);
      this.localStorageService.storeItem(this.GIVEN_ANSWERS_KEY, JSON.stringify(this.givenCorrectAnswers));
    }
  }

  public setQuiz(quiz: Quiz) {
    if (!quiz || !quiz.questions) {
      console.error('Quiz invalide ou sans questions');
      return;
    }

    this.quiz = quiz;
    if (this.questionId >= 0 && this.questionId < this.quiz.questions.length) {
      this.question = this.quiz.questions[this.questionId];
    } else {
      this.questionId = 0;
      this.question = this.quiz.questions[0];
    }

    // CHANGE OBSERVABLE VALUES
    this.question$.next(this.question);
    this.quiz$.next(quiz);

    // STORE DATA
    this.localStorageService.removeItem(this.IS_QUIZ_RUNNING_KEY);
    this.localStorageService.removeItem(this.QUIZ_KEY);

    this.localStorageService.storeItem(this.IS_QUIZ_RUNNING_KEY, JSON.stringify(this.isQuizRunning));
    this.localStorageService.storeItem(this.QUIZ_KEY, JSON.stringify(quiz));
  }

  public setQuestion(questionId: number): void {
    // Vérifier que this.quiz existe et a des questions
    if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
      const matchingQuestion = this.quiz.questions.find(q => q.questionId === questionId);
      if (matchingQuestion) {
        this.question = matchingQuestion;
        this.question$.next(this.question);
      }
    }
  }

  public getScore(): number { 
    return this.givenCorrectAnswers.length; 
  }

  public getQuestions(): Question[] | null {
    if (this.quiz && this.quiz.questions) { 
      return this.quiz.questions; 
    }
    return null;
  }

  public getNumberOfQuestions() {
    if (this.quiz && this.quiz.questions) return this.quiz.questions.length;
    return null;
  }

  public resetCurrentQuiz(): void {
    this.givenCorrectAnswers = [];
    this.questionId = 0;
    this.localStorageService.removeItem(this.QUIZ_KEY);
    this.localStorageService.removeItem(this.GIVEN_ANSWERS_KEY);
    this.isQuizRunning = false;
  }

  public nextQuestion() {
    if (this.isQuizRunning) {
      // Vérifier que this.quiz et this.quiz.questions existent
      if (!this.quiz || !this.quiz.questions) {
        console.error('Quiz ou questions non définis');
        this.resetCurrentQuiz();
        this.router.navigate(['/']);
        return;
      }

      if (this.questionId >= this.quiz.questions.length - 1) {
        this.isQuizRunning = false;
        this.localStorageService.storeItem(this.IS_QUIZ_RUNNING_KEY, JSON.stringify(this.isQuizRunning));
        if (this.gamemodeService.getCurrentGamemode().name === 'Solo') {
          this.router.navigate(["/quiz-scoreboard"]);
        } else if (this.gamemodeService.getCurrentGamemode().name === 'Multi') {
          this.router.navigate(['/quiz-multiplayer-scoreboard']);
        } else {
          this.router.navigate(['/']);
        }
      } else if (this.questionId < this.quiz.questions.length - 1) {
        this.questionId++;
        this.question = this.quiz.questions[this.questionId];
        this.question$.next(this.question);
      }
    } else {
      this.resetCurrentQuiz();
      console.log("An Error Occurred");
      this.router.navigate(['/']);
    }
  }

  public startQuiz() {
    if (!this.quiz) {
      console.error('Impossible de démarrer: quiz non défini');
      this.router.navigate(['/']);
      return;
    }

    this.resetCurrentQuiz();
    this.quiz = this.quizConfigurationService.applyProfileConfiguration(this.quiz);
    
    
    if (!this.quiz.questions || this.quiz.questions.length === 0) {
      console.error('Le quiz ne contient pas de questions après configuration');
      this.router.navigate(['/']);
      return;
    }
    
    this.isQuizRunning = true;
    
    this.question = this.quiz.questions[this.questionId];
    this.question$.next(this.question);

    this.localStorageService.storeItem(this.IS_QUIZ_RUNNING_KEY, JSON.stringify(this.isQuizRunning));
    this.localStorageService.storeItem(this.QUIZ_KEY, JSON.stringify(this.quiz));
  }

  public previousQuestion() {
    if (!this.quiz || !this.quiz.questions) {
      console.error('Quiz ou questions non définis');
      return;
    }
    
    if (this.questionId > 0) {
      this.questionId--;
      this.question = this.quiz.questions[this.questionId];
      if (this.question) this.question$.next(this.question);
    }
  }
}