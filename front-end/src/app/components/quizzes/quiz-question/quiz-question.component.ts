import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { QUESTION } from 'src/mocks/question.mock';
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

  private volume: number = 50;

  private question: Question = QUESTION;

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
    return this.question.hints;
  }

  public getAnswers() {
    return this.question.answers.concat(this.question.correctAnswer);
  }

  public getTitle() {
    return this.question.question;
  }

  public getAudioPath() {
    return this.question.audioPath;
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
    if (this.question.correctAnswer.includes(answer)) {
      console.log("Bonne Réponse");
    } else {
      const index = this.question.answers.indexOf(answer);
      if (index !== -1) {
        this.question.answers.splice(index, 1);
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

  public getAnswersPercents(){
    return [15,50,25,10];
  }

}