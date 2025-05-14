import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Quiz } from "src/models/quiz.model";
import { FormsModule } from '@angular/forms';
import { Question } from "src/models/question.model";
import { CommonModule } from '@angular/common';
import {Answer} from "src/models/answer.model";
import {AnswerComponent} from "../answer/answer.component";

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [FormsModule, CommonModule, AnswerComponent],
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnChanges {
  @Input() quiz!: Quiz;
  @Output() quizSaved = new EventEmitter<void>(); // Événement pour informer que le quiz est enregistré

  questions: Question[] = [];

  selectedQuestion: Question | null = null;
  selectedQuestionTitle: string = "";


  private selectedQuestionAnswers: Answer[] = [];

  selectedQuestionHints: string[] = [];


  constructor() {}

  addHint() {
    if (this.selectedQuestionHints) {
      this.selectedQuestionHints.push("");
    }
    this.updateQuizHints();
  }

  updateHintText(index: number, newText: string) {
    if (this.selectedQuestion) {
      this.selectedQuestion.hints[index] = newText;
      this.updateQuizHints();
    }
  }

  deleteHint(index: number) {
    if (this.selectedQuestionHints) {
      this.selectedQuestionHints.splice(index, 1);
      this.updateQuizHints();
    }
  }

  deleteAnswer(answer: Answer) {
    if (!this.selectedQuestion) return;

    const indexInAnswers = this.selectedQuestion.answers.findIndex(a => a.answerId === answer.answerId);
    if (indexInAnswers !== -1) {
      this.selectedQuestion.answers.splice(indexInAnswers, 1);
      return;
    }

    const indexInCorrect = this.selectedQuestion.correctAnswers.findIndex(a => a.answerId === answer.answerId);
    if (indexInCorrect !== -1) {
      this.selectedQuestion.correctAnswers.splice(indexInCorrect, 1);
    }
  }



  updateQuizHints() {
    // cette methode permet de mettre à jour le mock
    if (this.selectedQuestion) {
      this.selectedQuestion.hints = [...this.selectedQuestionHints];
    }
  }




  ngOnChanges(changes: SimpleChanges) {
    if (changes['quiz'] && changes['quiz'].currentValue) {
      this.questions = this.quiz.questions;
    }
  }

  selectQuestion(index: number) {
    this.selectedQuestion = this.questions[index];
    this.selectedQuestionTitle = this.selectedQuestion.question;
    this.selectedQuestionAnswers = this.selectedQuestion.answers;
    this.selectedQuestionHints = this.selectedQuestion.hints;
  }

  getAnswers(): Answer[] {
    if (!this.selectedQuestion) return [];
    return [...this.selectedQuestion.answers, ...this.selectedQuestion.correctAnswers];
  }


  updateQuestionTitle() {
    if (this.selectedQuestion) {
      this.selectedQuestion.question = this.selectedQuestionTitle;
    }
  }

  addQuestion() {
    const newQuestion = {
      questionId: this.questions.length + 1,
      question: "",
      answers: [],
      correctAnswers: [],
      hints: [],
      audioPath:"/assets/musics/Michael Jackson - Billie Jean.mp3"
    };

    this.questions.push(newQuestion); // Ajout à la liste des questions
  }


  saveQuiz() {
    console.log("Quiz enregistré !"); // Juste pour tester dans la console
    console.log(this.quiz)
  }

  updateAnswerText(index: number, newText: string) {
    this.selectedQuestionAnswers[index].answerContent = newText;
  }


  addAnswer() {
    if (this.selectedQuestion) {
      const newAnswer = {
        questionId: this.selectedQuestion.questionId,
        answerId: this.selectedQuestion.answers.length + 1,
        answerContent: "",
      };

      this.selectedQuestion.answers.push(newAnswer);
    }
  }

  isCorrect(answer: Answer): boolean {
    return this.selectedQuestion?.correctAnswers.some(correctAnswer => correctAnswer.answerId === answer.answerId) ?? false;
  }


  // permet de ne pas afficher le chemin complet jusqu'à la musique
  public getSelectedQuestionName(question: Question){
      let name = question.audioPath.split('/');
      const size = name.length
      return name[size-1]
  }

}
