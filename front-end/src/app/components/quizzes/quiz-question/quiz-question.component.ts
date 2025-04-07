import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { QUESTIONS } from 'src/mocks/question.mock';
import { Answer } from 'src/models/answer.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [QuizAnswerComponent, QuizHintComponent, CommonModule],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})

export class QuizQuestionComponent {

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  @Input()
  context: String | null = null;

  @Input()
  question: Question | null = null;

  @Output()
  nextQuestionEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  previousQuestionEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  correctAnswerEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>(); 

  private volume: number = 50;

  private currentProfile: Profile | undefined;

  constructor(private router: Router, private currentProfileService: CurrentProfileService) {
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })
  }

  public setVolume(newVolume: number) {
    this.volume = newVolume;
  }

  public getVolume() {
    return this.volume;
  }

  public getHints() {
    if (this.question) return this.question.hints;
    return null;
  }

  public getAnswers() {
    if (this.question) return this.question.answers.concat(this.question.correctAnswer);
    return null;
  }

  public getTitle() {
    if (this.question) return this.question.question;
    return null;
  }

  public getAudioPath() {
    if (this.question) return this.question.audioPath;
    return null;
  }

  public increaseVolume() {
    if (this.volume < 100) {
      this.volume += 10;
      console.log("increasing the volume");
    }
  }

  public decreaseVolume() {
    if (this.volume > 0) {
      this.volume -= 10;
      console.log("decreasing the volume");
    }
  }

  public answerSelected(answer: Answer) {
    if (this.question) {
      if (this.question.correctAnswer.includes(answer)) {
        this.correctAnswerEmitter.emit(true);
      } else {
        const index = this.question.answers.indexOf(answer);
        if (index !== -1) {
          this.question.answers.splice(index, 1);
        }
      }
    }
  }

  public accessToSettings() {
    if (this.currentProfile) {
      console.log(this.currentProfile);
      this.router.navigate(["/settings"])
    }
  }

  public restartMusic() {
    console.log("restarting the music...");
  }

  public getAnswersPercents() {
    return [15, 50, 25, 10];
  }

  public nextQuestion(){
    this.nextQuestionEmitter.emit(true);
  }

  public previousQuestion(){
    this.previousQuestionEmitter.emit(true);
  }

}