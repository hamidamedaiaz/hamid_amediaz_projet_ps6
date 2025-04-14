import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Quiz } from "../../../../models/quiz.model";
import { FormsModule } from '@angular/forms';
import { Question } from "../../../../models/question.model";
import { CommonModule } from '@angular/common';
import {Answer} from "../../../../models/answer.model";
import {AnswerComponent} from "../answer/answer.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [FormsModule, CommonModule, AnswerComponent, RouterLink],
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
  private selectedQuestionCorrectAnswers: Answer[] = [];

  selectedQuestionHints: String[] = [];


  constructor(private router: Router) {
  }

  addHint() {
  }
  deleteHint(index: number) {
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
    this.selectedQuestionCorrectAnswers = this.selectedQuestion.correctAnswer;
  }

  getAnswers(){
    return [...this.selectedQuestionCorrectAnswers, ...this.selectedQuestionAnswers];
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
      correctAnswer: [],
      audioPath:"/assets/musics/Michael Jackson - Billie Jean.mp3"
    };

    this.questions.push(newQuestion); // Ajout à la liste des questions
  }


  saveQuiz() {
    console.log("Quiz enregistré !"); // Juste pour tester dans la console
    this.quizSaved.emit(); // Émettre un événement pour signaler que le quiz est enregistré
  }

  updateAnswerText(index: number, newText: string) {
    this.selectedQuestionAnswers[index].answerContent = newText;
  }

  deleteAnswer(index: number){
    if(this.selectedQuestion){
      this.selectedQuestion.answers.splice(index, 1); // Supprime dans l'objet original
    }
  }



  addAnswer() {
    if (this.selectedQuestion) {
      const newAnswer = {
        questionId: this.selectedQuestion.questionId,
        answerId: this.selectedQuestion.answers.length + 1,
        answerContent: "",
      };

      this.selectedQuestion.answers.push(newAnswer);
      this.selectedQuestionAnswers = [...this.selectedQuestion.answers]; // LAISSER LE ... pour eviter de pointer sur la mm adresse mem
    }
  }

  isCorrect(answer: Answer): boolean {
    return this.selectedQuestion?.correctAnswer.some(correctAnswer => correctAnswer.answerId === answer.answerId) ?? false;
  }

}
