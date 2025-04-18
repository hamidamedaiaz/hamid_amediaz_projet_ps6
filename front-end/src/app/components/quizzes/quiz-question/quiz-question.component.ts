import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizAnswerComponent } from '../quiz-answer/quiz-answer.component';
import { QuizHintComponent } from '../quiz-hint/quiz-hint.component';
import { CommonModule } from '@angular/common';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { CurrentProfileService } from 'src/services/currentProfile.service';
import { Router } from '@angular/router';
import { Profile } from 'src/models/profile.model';
import { filter } from 'rxjs';
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

  private selectedAnswer:Answer[]=[];

  public showCorrectEffect:Boolean=false;

  constructor(private router: Router, private currentProfileService: CurrentProfileService) {
    this.currentProfileService.current_profile$.subscribe((currentProfile) => {
      this.currentProfile = currentProfile;
    })
    this.selectedAnswer=[];
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
    if (!this.question) return null;
  
    const allAnswers = (this.question.answers.concat(this.question.correctAnswer));
  
    //const shuffledAnswers = allAnswers.filter(ans => !this.selectedAnswer.some(sel => sel.answerId === ans.answerId));

    return allAnswers.filter(ans => !this.selectedAnswer.some(sel => sel.answerId === ans.answerId && sel.questionId === ans.questionId));;
      
  }

  public getAllAnswers(){
    if(this.question){
      return (this.question.answers.concat(this.question.correctAnswer));
    }
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
      const isCorrect = this.question.correctAnswer.some(
        (correct) => correct.answerId === answer.answerId
      );
  
      if (isCorrect) {
        
        this.showCorrectEffect = true;
  
        setTimeout(() => {
          this.showCorrectEffect = false;
          this.correctAnswerEmitter.emit(true);
        }, 1000);

        

      } else {
        const index = this.question.answers.indexOf(answer);
        if (index !== -1) {
          this.selectedAnswer.push(answer);
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
    const percent:number[] = [15, 50, 25, 10]
    const answerWithPercents:Object[]=[];
    const allAnswers = this.getAllAnswers()
    //console.log("allanswers: ",allAnswers)
    if(this.question && allAnswers){
      for(let i = 0; i < allAnswers.length; i++){
        answerWithPercents.push({answer: allAnswers[i], percent: percent[i]})
      }
    }
    console.log("answerwithpercent",answerWithPercents)
    return answerWithPercents;
  }

  public nextQuestion(){
    this.selectedAnswer=[];
    this.nextQuestionEmitter.emit(true);
  }

  public previousQuestion(){
    this.selectedAnswer=[];
    this.previousQuestionEmitter.emit(true);
  }

  private shuffle(answers:Answer[]) :Answer[]{
    const shuffled = answers.slice(); // make a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

}