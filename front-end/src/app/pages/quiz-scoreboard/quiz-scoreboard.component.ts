import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentQuizService } from 'src/services/current-quiz.service';

@Component({
  selector: 'app-quiz-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './quiz-scoreboard.component.html',
  styleUrl: './quiz-scoreboard.component.scss'
})
export class QuizScoreboardComponent {

  public score:number;
  public maxPoint:number|null;

  constructor(private router:Router, private currentQuizService:CurrentQuizService) {
    this.score = this.currentQuizService.getScore();
    this.maxPoint = this.currentQuizService.getNumberOfQuestions();
  }

  public getScore():number{
    return this.currentQuizService.getScore();
  }

  public getMaxScore(){
    return this.currentQuizService.getNumberOfQuestions();
  }

  public replay(){
    console.log("replay")
    this.router.navigate(["/select-quiz"])
  }

  public exit(){
    console.log("exiting the quiz...")
    this.router.navigate(["/"]);
  }

}
